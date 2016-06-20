// 生成路径文件夹
var serverPath = '../../hybrid/',

    //📝 版本号文件 文件名
    filename = 'version.txt',

    //📝 资源文件cdn前缀
    uzaicdn = 'http://r1.cdn.com/',

    //📝 忽略项目
    ignoreProject = ['test', 'library'],

    //📝 项目域名
    //name = 文件夹名称
    //url ＝ url地址
    projectURL = [{
        'name': 'custom',
        'url': 'http://mdingzhi.uzai.com/'
    }, {
        'name': 'discover',
        'url': 'http://m.uzai.com/discovery/hybrid/'
    }, {
        'name': 'member',
        'url': 'http://mhome.uzai.com/'
    }],

    //📝 版本号文件 json格式
    //❗️ 如果有修改需要在jsonEdit里面修改下
    jsonFormat = {
        'createTime': '',
        'update': {
            'html': [],
            'style': [],
            'script': [],
            'image': [],
            'font': [],
            'libs':[{
                'file': 'http://r03.uzaicdn.com/content/libs/jquery-2.1.1.min.js',
                'ver': '2.1.1'
            }, {
                'file': 'http://r03.uzaicdn.com/content/libs/frame/angular/angular.min.js',
                'ver': '1.5.5'
            }, {
                'file': 'http://r03.uzaicdn.com/content/libs/frame/angular/angular-lazyload.js',
                'ver': '1.0.0'
            }, {
                'file': 'http://r03.uzaicdn.com/content/libs/plugin/swiper/swiper-3.3.1.min.js',
                'ver': '3.3.1'
            }, {
                'file': 'http://r03.uzaicdn.com/content/libs/plugin/swiper/swiper.min.css',
                'ver': '3.3.1'
            }, {
                'file': 'http://r03.uzaicdn.com/content/libs/plugin/iscroll/iscroll.js',
                'ver': '5.1.2'
            }]
        },
        'replace': {
            '.html': [{
                'old': 'http://r03.uzaicdn.com',
                'new': '../../../r03.uzaicdn.com'
            }, {
                'old': 'http://r03.uzaicdn.com',
                'new': '../../../r03.uzaicdn.com'
            }],
            '.js': [],
            '.css': [{
                'old': 'http://r03.uzaicdn.com',
                'new': '../../../../../r03.uzaicdn.com'
            }]
        },
        'hybridVersion': {
            'ios': '1',
            'android': '1'
        }
    };

module.exports.uzaicdn = uzaicdn;
module.exports.ignoreProject = ignoreProject;
module.exports.jsonFormat = jsonFormat;
module.exports.projectURL = projectURL;
module.exports.filename = filename;
module.exports.serverPath = serverPath;
