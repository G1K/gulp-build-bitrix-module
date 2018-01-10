
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('tools start');
        gulp.src(plugins.path.join(config.build, setting.sourse, '**/*.php'), {dot: true})
                .pipe(plugins.batchReplace(setting.tools))
                .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                .on('end', function() {
                    console.log('tools stop');
                    callback();
                });
    };
};