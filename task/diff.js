
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('diff start');
        plugins.git.exec({args: `diff ${setting.version} --name-only`}, (error, output) => {
            if (error) {
                callback(error);
            }
            let path = [];
            output.split(plugins.os.EOL).map((file) => {
                if (!file.match(/(dist\/)/) && file != '') {
                    if (config.tools[file]) {
                        path.push(plugins.path.join(file, '**'));
                    } else {
                        path.push(file);
                    }
                }
            });
            setting.file = setting.sourse = setting.version;
            gulp.src(path, {base: './'})
                    .pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
                    .on('end', function () {
                        console.log('diff start');
                        callback();
                    });
        });
    };
};