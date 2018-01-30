
module.exports = function (gulp, plugins, config, setting) {
    return gulp.series(
            plugins.log('last_version start'),
            plugins.getTask('build'),
            function (callback) {
                setting.file = '.last_version';
                console.log('last_version setting start');
                return gulp.src(plugins.path.join(config.build, setting.sourse, '**'))
                        .pipe(gulp.dest(plugins.path.join(config.build, setting.file)))
                        .on('end', function () {
                            console.log('last_version setting stop');
                            callback();
                        });
                ;
            },
            plugins.getTask('clean_sourse'),
            function (callback) {
                console.log('last_version config start');
                setting.sourse = setting.file;
                callback();
            },
            plugins.getTask('compact'),
            plugins.getTask('archive'),
            plugins.getTask('clean'),
            plugins.log('last_version stop')
            );
};