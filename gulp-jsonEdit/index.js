 
var through = require('through-gulp');

// 设置前缀路径
// 配置文件
var config = require('version-config.js');
var uzaicdn = config.uzaicdn;
var ignoreProject = config.ignoreProject;
var jsonFormat = config.jsonFormat;
var projectURL = config.projectURL;


function jsonEdit() {
    'use strict';
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
                    var fileType = x.split('/')[0];
                    var fileProject = x.split('/')[1];

                    var returnFile = ignoreProjectFunc(fileProject);
                    if (returnFile === 'true') {
                        //console.log('++++' + fileProject);
                        project.push(fileProject);
                        switch (fileType) {
                            case 'fonts':
                                cache_fonts[x] = json[x];
                                //console.log('字体' + x);
                                break;
                            case 'images':
                                cache_images[x] = json[x];
                                //console.log('图片' + x);
                                break;
                            case 'styles':
                                cache_styles[x] = json[x];
                                //console.log('样式' + x);
                                break;
                            case 'scripts':
                                cache_scripts[x] = json[x];
                                //console.log('脚本' + x);
                                break;
                            case 'html':
                                cache_html[x] = json[x];
                                break;
                            default:
                                cache_others[x] = json[x];
                                //console.log('其他' + x);
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
                    images[i].file = uzaicdn + versionFormat_images[i][0];
                    images[i].ver = versionFormat_images[i][1];
                }
                //字体
                for (var i in cache_fonts) {
                    versionFormat_fonts.push([i, cache_fonts[i]]);
                }
                for (var i = 0; i < versionFormat_fonts.length; i++) {
                    fonts[i] = {};
                    fonts[i].file = uzaicdn + versionFormat_fonts[i][0];
                    fonts[i].ver = versionFormat_fonts[i][1];
                }
                //样式
                for (var i in cache_styles) {
                    versionFormat_styles.push([i, cache_styles[i]]);
                }
                for (var i = 0; i < versionFormat_styles.length; i++) {
                    styles[i] = {};
                    styles[i].file = uzaicdn + versionFormat_styles[i][0];
                    styles[i].ver = versionFormat_styles[i][1];
                }
                //脚本
                for (var i in cache_scripts) {
                    versionFormat_scripts.push([i, cache_scripts[i]]);
                }
                for (var i = 0; i < versionFormat_scripts.length; i++) {
                    scripts[i] = {};
                    scripts[i].file = uzaicdn + versionFormat_scripts[i][0];
                    scripts[i].ver = versionFormat_scripts[i][1];
                }
                //html
                for (var i in cache_html) {
                    versionFormat_html.push([i, cache_html[i]]);
                }
                for (var i = 0; i < versionFormat_html.length; i++) {
                    html[i] = {};
                    var projectName = versionFormat_html[i][0].split('/')[1];

                    var url = versionHtmlFunc(projectName);

                    if (url === 'false') {
                        html[i].file = uzaicdn + versionFormat_html[i][0];
                        html[i].ver = versionFormat_html[i][1];
                    } else {
                        var path = versionFormat_html[i][0];
                        var aa = 'html/' + projectName + '/';
                        path = path.replace(/\//g, '%2f');
                        aa = aa.replace(/\//g, '%2f');
                        path = path.replace(eval('/' + aa + '/g'), '');

                        path = unescape(path);
                        html[i].file = url + path;
                        html[i].ver = versionFormat_html[i][1];
                    }


                }
                //其他
                for (var i in cache_others) {
                    versionFormat_others.push([i, cache_others[i]]);
                }

                for (var i = 0; i < versionFormat_others.length; i++) {
                    others[i] = {};
                    others[i].file = uzaicdn + versionFormat_others[i][0];
                    others[i].ver = versionFormat_others[i][1];
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
                console.log('\n' + '创建时间：' + time.toLocaleString() + '\n\n');
                console.log('  一共' + project.length + '个项目，分别为' + '\n  ' + project);
                console.log('\n  ' + versionFormat_images.length + '个图片文件');
                console.log('\n  ' + versionFormat_fonts.length + '个字体文件');
                console.log('\n  ' + versionFormat_styles.length + '个css文件');
                console.log('\n  ' + versionFormat_scripts.length + '个js文件');
                console.log('\n  ' + versionFormat_html.length + '个html文件');
                if (versionFormat_others.length > 0) {
                    console.log('\n  ' + versionFormat_others.length + '个其他文件' + '\n');
                } else {
                    console.log('\n  没有其他文件' + '\n');
                }

            }


            this.push(file);
            callback();
        },
        function(callback) {
            callback();
        });
    return stream;
}


module.exports = jsonEdit;
