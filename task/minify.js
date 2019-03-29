
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('minify start');
        if (config.minify) {
            return gulp.src(config.minify.map(function (file) {
                if (file.substr(0, 1) === '!') {
                    return plugins.path.join('!' + config.build, setting.sourse, file.substr(1));
                } else {
                    return plugins.path.join(config.build, setting.sourse, file);
                }
            }))
                    .pipe(plugins.getTask('minify-file')())
                    .on('end', function () {
                        console.log('compact stop');
                        callback();
                    });
        } else {
            console.log('minify stop');
            callback();
        }
    };
};