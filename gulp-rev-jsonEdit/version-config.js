// 生成路径文件夹
var serverPath = '../Publish/content/hybrid/',

    // 版本号文件 文件名
    filename = 'version.txt',

    //https生成文件名字
    sslname = 'version-ssl.txt',

    // 资源文件cdn前缀
    //http://r03.cdn.com/content/hybrid/
    cdn = '//r03.cdn.com/content/hybrid/',

    // 忽略项目
    //ignoreProject = ['demo','html', 'beijingtour', 'library', 'test', 'exchange', 'member', 'subject', '历史记录', '列表', 'test-route', 'unionpay', 'miracle', 'popup', 'magic', 'read-more', 'history', 'search', 'template','index','index-app'],

    //需要打包的项目
    coverProject = [
        'booking','common','custom','discover','mbuy','mpay','product','pay','singleproduct'
    ],

    // 项目域名
    // name:前端资源的文件夹名
    // url :线上地址
    // root_path: 物理地址
    projectURL = [{
        'name': 'custom',
        'url': '//mdingzhi.u.com/hybrid/',
        'root_path': '../../mdingzhi_u_com/Hybrid/'
    }, {
        'name': 'discover',
        'url': '//m.u.com/discover/hybrid/',
        'root_path': '../../M/discover/Hybrid/'
    }, {
        'name': 'member',
        'url': '//mhome.u.com/',
        'root_path': '../../mhome_u_com/Hybrid/'
    }, {
        'name': 'product',
        'url': '//m.u.com/product/hybrid/',
        'root_path': '../../M/product/hybrid/'
    },
	{
        'name': 'singleproduct',
        'url': '//m.u.com/singleproduct/hybrid/',
        'root_path': '../../M/singleproduct/hybrid/'
    }, {
        'name': 'mbuy',
        'url': '//mbuy.u.com/hybrid/',
        'root_path': '../../mbuy_u_com/Hybrid/'
    }, {
        'name': 'mpay',
        'url': '//mpay.u.com/hybrid/',
        'root_path': '../../mpay_u_com/Hybrid/'
    }],

    // 版本号文件 json格式
    // 如果有修改需要在jsonEdit里面修改下
    jsonFormat = {
        'createTime':'',
        'update': {
            'html': [],
            'style': [],
            'script': [],
            'image': [],
            'font': [],
            'libs': [{
                'file': '//r03.cdn.com/content/libs/jquery-2.1.1.min.js',
                'ver': '3605660716'
            }, {
                'file': '//r03.cdn.com/content/libs/frame/angular/angular.min.js',
                'ver': '1723460373'
            }, {
                'file': '//r03.cdn.com/content/libs/frame/angular/angular-lazyload.js',
                'ver': '2570371747'
            }, {
                'file': '//r03.cdn.com/content/libs/plugin/swiper/swiper-3.3.1.min.js',
                'ver': '1466904961'
            }, {
                'file': '//r03.cdn.com/content/libs/plugin/swiper/swiper.min.css',
                'ver': '2951268204'
            }, {
                'file': '//r03.cdn.com/content/libs/plugin/iscroll/iscroll.js',
                'ver': '108983682'
            }, {
                'file': '//r03.cdn.com/content/libs/plugin/swiper/swiper.animate.min.js',
                'ver': '4251710681'
            }, {
                'file': '//r03.cdn.com/content/libs/frame/vue/vue.js',
                'ver': '3544575529'
            }]
        },
        'replace': {
            '.html': [{
                'old': 'https://r03.cdn.com',
                'new': '../../../r03.cdn.com'
            }, {
                'old': 'https://r03.cdn.com',
                'new': '../../../r03.cdn.com'
            }],
            '.js': [],
            '.css': [{
                'old': 'https://r03.cdn.com',
                'new': '../../../../../r03.cdn.com'
            }]
        },
        'hybridVersion': {
            'ios': '1',
            'android': '1'
        }
    };

module.exports.cdn = cdn;
//module.exports.ignoreProject = ignoreProject;
module.exports.coverProject = coverProject;
module.exports.jsonFormat = jsonFormat;
module.exports.projectURL = projectURL;
module.exports.filename = filename;
module.exports.serverPath = serverPath;
module.exports.sslname = sslname;