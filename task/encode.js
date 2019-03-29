
module.exports = function (gulp, plugins, config, setting) {
	return function (callback) {
		console.log('encode start');


		return gulp.src(config.encode.map(function (file) {
				if (file.substr(0, 1) === '!') {
					return plugins.path.join('!' + config.build, setting.sourse, file.substr(1));
				} else {
					return plugins.path.join(config.build, setting.sourse, file);
				}
			}), {allowEmpty: true})
			.pipe(plugins.convertEncoding({to: 'win1251'}))
			.pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
			.on('end', function () {
				console.log('encode stop');
				callback();
			});
	};
};