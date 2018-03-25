
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('dist start');
        return gulp.src([config.distVersion + setting.version + '/**'], {base: './' + config.distVersion + setting.version})
                .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                .on('end', function () {
                    console.log('dist start');
                    callback();
                });
    };
};