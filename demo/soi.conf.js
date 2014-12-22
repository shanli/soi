﻿/**
 * @fileoverview CONFIGURATION FILE
 *   Also used for the demo project
 * @author AceMood(zmike86)
 * @email zmike86@gmail.com
 */

module.exports = {

    // read-in stream should be what encoding
    encoding        : 'utf8',

    // what kind of files should be ignored
    // new RegExp('\\.(' + js_config.ignoreFileExt.join('|') + ')$', 'i')
    ignoreFileExt   : ['md', 'json', 'txt', 'tpl', 'tmpl', 'java', 'py', 'rb', 'cs', 'h', 'rar', 'zip'],

    // debug mode
    debug           : true,

    // directories that would not be calculated
    preserved       : {
        'imgs'      : true,
        'build'     : true,
        'dist'      : true,
        'templates' : true,
        'demos'     : true
    },

    // which dir to be relative, defaults to where soi.conf.js located;
    // all path should be calculated based on this directory
    base_dir        : __dirname + '/',

    // after build all files placed, if null value, all files would generated
    // be with the original file, but I highly recommend need a dist directory
    dist_dir        : './dist/',

    // dist file relative to dist_dir
    dist_css_file   : 'css/build.css',

    // dist file relative to dist_dir
    dist_js_file    : 'js/build.js',

    // js module loader
    module_loader   :  './lib/require.js',

    // start css file as the entry point
    // *I HIGHLY RECOMMEND* bundle all css files into one
    // So it's only need to provide single entry point
    css_entry_point : './assets/css/test.css',

    // logic start file or async load modules entry file
    input_file      :  [
        {
            path    : './assets/js/app.js',
            defer   : false
        }
    ],

    // If debug set to true, we around all js files' path with script html tag
    // and write it to this file, which can be paste into your template or html file
    // for source debugging (or you can use source map)
    output_file     : './output/temp.txt',

    // If debug set to true, output_file_base could be work together with output_file
    // it's the directory where template located
    output_base     : './',

    // Manually added files
    // 需要遍历的目录，这些目录的所有文件都会被计算
    files           : {
        css         : [
            './assets/css/'
        ],
        js          : [
            './lib/',
            './assets/js/'
        ],
        img         : [
            './assets/img/'
        ]
    }

};