/**
 * @fileoverview server模块的配置文件样例
 * @author AceMood(zmike86)
 * @email zmike86@gmail.com
 */

'use strict';

soi.config.extend({
    // 本地server配置节点
    server: {
        rootDir: './webroot', // 要被复制到的目录, 且该目录作为server的根目录存在
        port: '3000', // 启动端口
        // 文件的映射, from本地目录中的文件将会被复制到to的目录中,
        // from相对于server-conf.js文件取相对位置,
        // to则取rootDir的相对位置.
        // from和to支持glob形式的正则匹配, 也支持自己写逻辑的函数返回字符串
        files: [
            {
                from: 'src/page/*.html',
                to: 'page/'
            },
            {
                from: 'src/static/js/*.js',
                to: 'static/js/'
            },
            {
                from: function() {
                    return 'src/static/css/*.css'
                },
                to: function() {
                    return 'static/css/'
                }
            }
        ],
        // 代码中ajax请求的接口, 用于前端自己模拟数据, post方式目前没有好的模拟代码.
        // 需要前端和服务端开发在开发机服务器连调
        endpoint: {
            '/getUserInfo?uid={{uid}}': 'static/json/user.json',
            '/getAppList?from={{fromIndex}}&to={{toIndex}}': 'static/json/apps.json'
        }
    }
});