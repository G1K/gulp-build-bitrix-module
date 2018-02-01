
module.exports = function (gulp, plugins, config, setting) {
    return gulp.series(
            plugins.log('build start'),
            plugins.getTask('clean'),
            gulp.series(function (callback) {
                console.log('build setting start');
                setting.file = 'utf8';
                setting.sourse = config.name;
                return gulp.src(config.path, {base: './'})
                        .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                        .on('end', function () {
                            console.log('build setting stop');
                            callback();
                        });
            }),
            gulp.parallel(plugins.getTask('version-tools'), plugins.getTask('version-tags')),
            plugins.getTask('version'),
            plugins.getTask('tools'),
            plugins.getTask('compact'),
            plugins.getTask('archive'),
            function (callback) {
                setting.file = 'cp1251';
                callback();
            },
            plugins.getTask('encode'),
            plugins.getTask('archive'),
            plugins.log('build stop')
            );
};