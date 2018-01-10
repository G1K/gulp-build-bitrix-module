
module.exports = function (gulp, plugins, config, setting) {
    return gulp.series(
            plugins.log('build_item start'),
            plugins.getTask('build'),
            plugins.getTask('clean'),
            plugins.log('build_item stop')
            );
};