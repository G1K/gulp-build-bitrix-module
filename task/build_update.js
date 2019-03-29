
module.exports = function (gulp, plugins, config, setting) {
    return gulp.series(
            plugins.log('build_update start'),
            plugins.getTask('clean'),
            function (callback) {
                console.log('build_update config start');
                setting.file = setting.sourse = setting.version;
                callback();
            },
            gulp.parallel(plugins.getTask('version-tools'), plugins.getTask('version-tags')),
            plugins.getTask('version'),
            plugins.getTask('description'),
            plugins.getTask('diff'),
            plugins.getTask('dist'),
            plugins.getTask('tools'),
            plugins.getTask('encode'),
            plugins.getTask('compact'),
            plugins.getTask('archive'),
            plugins.getTask('clean'),
            plugins.log('build_update stop')
            );
};