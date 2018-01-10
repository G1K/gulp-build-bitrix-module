
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('archive start');
        let sourse = setting.file ? setting.file : setting.sourse;
        return gulp.src(plugins.path.join(config.build, '**/*'), {dot: true})
                .pipe(plugins.tar(sourse + '.tar'))
                .pipe(plugins.gzip())
                .pipe(gulp.dest(config.dist))
                .on('end', function () {
                    console.log('archive stop');
                    callback();
                });
    };
};