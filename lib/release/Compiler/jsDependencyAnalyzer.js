/**
 * @fileoverview 分析kernel中的依赖树，产出一份有序去重的文件列表。
 *     分析器不会改变js源代码，这部分工作在compiler里面做。
 * @author AceMood
 * @email zmike86@gmail.com
 */

'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

// custom modules
var utils = require('../utils');
var unique = utils.unique;
var constants = require('../constants');
var ModuleManager = require('./manager.js');
var Module = require('./module');
var Resource = require('../resource/Resource');
var ResourceTable = require('../resource/ResourceTable');

// local vars
var seen = [];  // lifetime: 遍历一个pkg期间, 保留是否执行过模块
var tree = {};  // lifetime: 遍历一个pkg期间, 保留模块和依赖对应关系
var currentModulePath = [];


/**
 * 根据入口分析依赖文件.
 * @param {String} startPath 相对cwd的路径 或 相对系统的绝对路径
 * @param {String} encoding 文件编码，默认utf8
 */
function loop(startPath, encoding) {
  encoding = encoding || 'utf8';
  // 转化成绝对路径
  var absStartPath = path.resolve(startPath);

  soi.log.info('Analyzing javascript file located at: ', absStartPath);

  // file has been parsed
  if (seen.indexOf(absStartPath) > -1) {
    return;
  }

  seen.push(absStartPath);

  // 记录当前之行代码的js文件路径
  currentModulePath.push(absStartPath);

  // 读文件
  var content = soi.fs.readFile(absStartPath, { encoding: encoding });
  vm.runInNewContext(content, ENV);
}


// 脚本执行环境，见: http://nodejs.org/api/vm.html
var ENV = {
  define: function(id, deps, factory) {
    // 取得当前文件路径
    var filepath = currentModulePath[currentModulePath.length - 1];

    // Note: 首次加载的js文件均要创建单个资源记录,
    // 但按需异步加载的模块不会创建单个资源记录, 而是注册资源包package.
    if (ResourceTable.getResourceByAbsolutePath('js', filepath)) {
      return;
    }

    // Module has been registered
    // Note: 所有执行过的模块都需要注册到ModuleManager而不必区分是否异步载入.
    if (ModuleManager.getModuleByPath(filepath)) {
      currentModulePath.pop();
      return;
    }

    // current pkg already look into this file
    if (tree[filepath]) {
      return;
    }

    // deal with mutable arguments
    if (typeof id !== 'string') {
      factory = deps;
      deps = id;
      id = ModuleManager.getAnonymousModuleId(false);
    } else if (id === 'anonymous') {
      id = ModuleManager.getAnonymousModuleId(true);
    }

    if (!soi.utils.isArray(deps)) {
      factory = deps;
      deps = [];
      if (typeof factory !== 'function' && !soi.utils.isObject(factory)) {
        soi.log.error(
            'define a module must provide a factory function' +
            ' or exports object! \nFind in: ' + filepath + ' \n');
        process.exit(1);
      }
    }

    // normalize dependency paths
    deps = deps.map(function(dep) {
      if (dep.indexOf(constants.JS_FILE_EXT) === -1) {
        dep += constants.JS_FILE_EXT;
      }
      return soi.utils.normalizeSysPath(
        path.resolve(path.dirname(
          currentModulePath[currentModulePath.length - 1]), dep));
    });

    tree[filepath] = deps;


    if (seen.indexOf(filepath) === -1) {
      seen.push(filepath);
    }

    // loop recursion FIRST
    deps.forEach(function(_path) {
      loop(_path);
      /*
      if (seen.indexOf(_path) > -1) {
        return;
      }
      currentModulePath.push(_path);

      var code = soi.fs.readFile(_path);

      // 解析其中的require.async
      // add(retrieve(code));

      vm.runInNewContext(code, ENV);*/
    });

    // create resource & register module
    // do not repeat creating resource
    // if (!ResourceTable.getResource('js', filepath)) {
    //   createResource(filepath);
    // }

    // 所有define过的模块都需要注册
    var mod = new Module({
      id      : id,
      deps    : deps,
      factory : factory,
      status  : Module.STATUS.RESOLVED
    });
    mod.setPath(filepath);
    ModuleManager.register({
      id      : id,
      module  : mod
    });

    // maintain and sync the paths track stack
    currentModulePath.pop();
  },
  require: function(deps, factory) {
    ENV.define('anonymous', deps, factory);
  }
};


// todo 可视化输出有向图结构，对于循环依赖一目了然
// todo 循环依赖的检查，深度优先遍历


/**
 * 创建依赖分析树，产出文件列表
 * @param {string} node 入口文件的绝对路径
 * @returns {array}
 */
function constructTree(node) {
  var visited = [];
  function t(deps) {
    // 'cause will reverse
    // here first reverse it [a,b] -> [b,a]
    deps = deps.reverse();
    visited = visited.concat(deps);
    deps.forEach(function(dep) {
      t(tree[dep] || []);
    });
  }

  visited.push(node);
  t(tree[node] || []);

  soi.utils.unique(visited.reverse());
  return visited;
}


/**
 * 清除上次分析结果
 */
function reset() {
  currentModulePath = [];
  tree = {};
  seen = [];
}


/**
 * 计算模块依赖
 * @param {Array.<String>} entry 包含入口文件的数组
 */
function run(entry) {
  var fileList = [];

  // 清除上次分析结果
  reset();

  // 遍历每个入口文件，传入相对cwd的路径
  entry.forEach(function(fileName) {
    loop(fileName, 'utf8');
    fileList = fileList.concat(constructTree(seen[0]));
  });

  soi.utils.unique(fileList);

  // debugger;
  return fileList;
}


// 导出
exports.run = run;
exports.reset = reset;