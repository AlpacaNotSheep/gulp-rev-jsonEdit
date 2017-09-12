# gulp-rev-jsonEdit

根据json生成version文件的小插件,依赖through-gulp。
可下载下来修改index.js文件。
可以配合gulp-rev 和 gulp-rev-revCollector使用，
gulp-rev 生成 带有version的.json文件，gulp-rev-revCollector进行替换，
gulp-rev-jsonEdit进行编辑


## json格式

需要修改gulp-rev， 按以下格式生成资源文件的MD5。

` { "fonts/custom/banner_two/钟齐陈伟勋硬笔行楷简.eot": "8a6802d127" }`

## 使用

    var gulp = require('gulp'),
    jsonEdit = require('gulp-rev-jsonEdit');


    //...


    gulp.task('version', function() {
        return gulp.src('release/html/*.json').pipe(jsonEdit());
    });
