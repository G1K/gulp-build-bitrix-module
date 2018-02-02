
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('compact start');
        if (config.encode) {
            return gulp.src(config.encode, {base: plugins.path.join(config.build, setting.sourse)})
                    .pipe(plugins.getTask('compact-file')())
                    .on('end', function () {
                        console.log('compact stop');
                        callback();
                    });
        } else {
            console.log('compact stop');
            callback();
        }
    };
};