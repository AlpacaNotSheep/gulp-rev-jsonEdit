var through = require('through-gulp');
// 设置前缀路径
// 配置文件
var config = require('../../version-config.js'),
    cdn = config.cdn,
    ignoreProject = config.ignoreProject,
    coverProject = config.coverProject,
    jsonFormat = config.jsonFormat,
    projectURL = config.projectURL;

function jsonEdit(protocal) {
    'use strict';
    var protocal = protocal;
    var stream = through(function(file, encoding, callback) {
        //去重
        function delDuplicate(arr) {
            arr.sort(); //先排序
            var res = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] !== res[res.length - 1]) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        if (file.isBuffer()) {
            //判断下是否包含协议名，如果包含就替换成空
            if (cdn.indexOf('http://') > -1) {
                cdn = cdn.replace(/http:/g, '');
            } else if (cdn.indexOf('https://') > -1) {
                cdn = cdn.replace(/https:/g, '');
            }
            cdn = protocal + ':' + cdn;
            // 读取文件内容
            var json = JSON.parse(file.contents.toString());
            var project = [],
                cache_fonts = {},
                cache_images = {},
                cache_styles = {},
                cache_scripts = {},
                cache_others = {},
                cache_html = {},
                versionFormat_images = [],
                versionFormat_fonts = [],
                versionFormat_styles = [],
                versionFormat_scripts = [],
                versionFormat_others = [],
                versionFormat_html = [],
                fonts = [],
                images = [],
                styles = [],
                scripts = [],
                others = [],
                html = [];

            function ignoreProjectFunc(fileProject) {
                for (var m = 0; m < ignoreProject.length; m++) {
                    if (fileProject === ignoreProject[m]) {
                        return 'false';
                    }
                }
                return 'true';
            }

            function coverProjectFunc(fileProject,x) {

                for (var m = 0; m < coverProject.length; m++) {
                    if (fileProject === coverProject[m] && x.indexOf('demo') < 0) {
                        return 'true';
                    }
                }
                return 'false';
            }

            function versionHtmlFunc(projectName) {
                for (var p = 0; p < projectURL.length; p++) {
                    if (projectURL[p].name === projectName) {
                        return projectURL[p].url;
                    }
                }
                return 'false';
            }
            //取值
            for (var x in json) {
                //var fileType = x.split('/')[0];

                //根据文件后缀名判断文件类型
                var fileTypeSuffix = x.split('.').length;
                var fileType = x.split('.')[fileTypeSuffix - 1];
                var fileProject = x.split('/')[1];
                //var returnFile = ignoreProjectFunc(fileProject);
                var returnFile = coverProjectFunc(fileProject,x);

                if (returnFile === 'true') {

                    project.push(fileProject);
                    switch (fileType) {
                        case 'eot':
                        case 'svg':
                        case 'ttf':
                        case 'woff':
                        case 'fonts':
                            cache_fonts[x] = json[x];
                            //console.log('字体' + x);
                            break;
                        case 'jpg':
                        case 'png':
                        case 'gif':
                        case 'images':
                            cache_images[x] = json[x];
                            //console.log('图片' + x);
                            break;
                        case 'css':
                        case 'styles':
                            cache_styles[x] = json[x];
                            //console.log('样式' + x);
                            break;
                        case 'js':
                        case 'scripts':
                            cache_scripts[x] = json[x];
                            //console.log('脚本' + x);
                            break;
                        case 'html':
                            cache_html[x] = json[x];
                            break;
                        default:
                            cache_others[x] = json[x];
                            console.log('\u5176\u4ed6' + x);
                            break;
                    }
                }
            }
            //处理数据打印信息  修改数据格式
            project = delDuplicate(project);
            // console.log(project);
            //图像
            for (var i in cache_images) {
                versionFormat_images.push([i, cache_images[i]]);
            }
            for (var i = 0; i < versionFormat_images.length; i++) {
                images[i] = {};
                images[i].file = cdn + versionFormat_images[i][0];
                images[i].ver = versionFormat_images[i][1];
            }
            //字体
            for (var i in cache_fonts) {
                versionFormat_fonts.push([i, cache_fonts[i]]);
            }
            for (var i = 0; i < versionFormat_fonts.length; i++) {
                fonts[i] = {};
                fonts[i].file = cdn + versionFormat_fonts[i][0];
                fonts[i].ver = versionFormat_fonts[i][1];
            }
            //样式
            for (var i in cache_styles) {
                versionFormat_styles.push([i, cache_styles[i]]);
            }
            for (var i = 0; i < versionFormat_styles.length; i++) {
                styles[i] = {};
                styles[i].file = cdn + versionFormat_styles[i][0];
                styles[i].ver = versionFormat_styles[i][1];
            }
            //脚本
            for (var i in cache_scripts) {
                versionFormat_scripts.push([i, cache_scripts[i]]);
            }
            for (var i = 0; i < versionFormat_scripts.length; i++) {
                scripts[i] = {};
                scripts[i].file = cdn + versionFormat_scripts[i][0];
                scripts[i].ver = versionFormat_scripts[i][1];
            }
            //html
            for (var i in cache_html) {
                versionFormat_html.push([i, cache_html[i]]);
            }
            for (var i = 0; i < versionFormat_html.length; i++) {
                html[i] = {};
                //console.log('000---' + versionFormat_html[i][0]);

                var projectName = versionFormat_html[i][0].split('/')[1];
                //console.log('111---' + projectName);
                var url = versionHtmlFunc(projectName);
                if (url === 'false') {
                    html[i].file = cdn + versionFormat_html[i][0];
                    html[i].ver = versionFormat_html[i][1];
                } else {
                    var path = versionFormat_html[i][0];
                    var aa = 'html/' + projectName + '/';
                    path = path.replace(/\//g, '%2f');
                    aa = aa.replace(/\//g, '%2f');
                    path = path.replace(eval('/' + aa + '/g'), '');
                    path = unescape(path);
                    html[i].file = protocal + ':' + url + path;
                    html[i].ver = versionFormat_html[i][1];
                }
            }
            //其他
            for (var i in cache_others) {
                versionFormat_others.push([i, cache_others[i]]);
            }
            for (var i = 0; i < versionFormat_others.length; i++) {
                others[i] = {};
                others[i].file = cdn + versionFormat_others[i][0];
                others[i].ver = versionFormat_others[i][1];
            }
            //写入libs的协议
            for (var i = 0; i < jsonFormat.update.libs.length; i++) {
                var libsFile = jsonFormat.update.libs[i].file;
                if (libsFile.indexOf('http://') > -1) {
                    libsFile = libsFile.replace(/http:/g, '');
                } else if (libsFile.indexOf('https://') > -1) {
                    libsFile = libsFile.replace(/https:/g, '');
                }
                jsonFormat.update.libs[i].file = protocal + ':' + libsFile;
            }
            //写入数据和时间
            var time = new Date();
            jsonFormat.createTime = time.toLocaleString().toString();
            jsonFormat.update.font = fonts;
            jsonFormat.update.image = images;
            jsonFormat.update.style = styles;
            jsonFormat.update.script = scripts;
            jsonFormat.update.other = others;
            jsonFormat.update.html = html;
            file.contents = new Buffer(JSON.stringify(jsonFormat), 'utf-8');
            console.log('\n' + '\u521b\u5efa\u65f6\u95f4\uff1a' + time.toLocaleString() + '\n\n');
            console.log('\u0020\u0020\u4e00\u5171' + project.length + '\u4e2a\u9879\u76ee\uff0c\u5206\u522b\u4e3a' + '\n  ' + project);
            console.log('\n  ' + versionFormat_images.length + '\u4e2a\u56fe\u7247\u6587\u4ef6');
            console.log('\n  ' + versionFormat_fonts.length + '\u4e2a\u5b57\u4f53\u6587\u4ef6');
            console.log('\n  ' + versionFormat_styles.length + '\u4e2a\u0063\u0073\u0073\u6587\u4ef6');
            console.log('\n  ' + versionFormat_scripts.length + '\u4e2a\u006a\u0073\u6587\u4ef6');
            console.log('\n  ' + versionFormat_html.length + '\u4e2a\u0068\u0074\u006d\u006c\u6587\u4ef6');
            if (versionFormat_others.length > 0) {
                console.log('\n  ' + versionFormat_others.length + '\u4e2a\u5176\u4ed6\u6587\u4ef6' + '\n');
                console.log('\n  ' + versionFormat_others.file + '\n');
            } else {
                console.log('\n  \u6ca1\u6709\u5176\u4ed6\u6587\u4ef6' + '\n');
            }
        }
        this.push(file);
        callback();
    }, function(callback) {
        callback();
    });
    return stream;
}
module.exports = jsonEdit;