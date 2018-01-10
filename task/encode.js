
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('encode start');
        return gulp.src([
            plugins.path.join(config.build, setting.sourse, '**/*.md'),
            plugins.path.join(config.build, setting.sourse, '**/*.php'),
            plugins.path.join(config.build, setting.sourse, '**/*.js')
        ])
                .pipe(plugins.convertEncoding({to: 'win1251'}))
                .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                .on('end', function () {
                    console.log('encode stop');
                    callback();
                });
    };
};