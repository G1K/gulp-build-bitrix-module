const _        = require('lodash');
module.exports = function (gulp, plugins, config, setting) {
	return function (callback) {
		console.log('diff start', setting);
		plugins.git.exec({args: `diff ${setting.version} ${setting.diff} --name-only`}, (error, output) => {
			if (error) {
				callback(error);
			}
			console.log('Files git diff ',output);

			let path = ['description.ru', 'install/version.php'];
			output.split(plugins.os.EOL).map((file) => {
				if (file != '' && plugins.fs.existsSync('./' + file)) {
					let stats = plugins.fs.lstatSync('./' + file);
					if (stats.isDirectory()) {
						path.push(plugins.path.join(file, '**'));
					} else {
						path.push(file);
					}
				}
			});
			setting.file = setting.sourse = setting.version;

			// Исключаем общее включениее.
			let pa = _.union(path, _.reject(config.path, function (n) {
				return ['./**'].includes(n);
			}));

			console.log(pa);

			gulp.src(pa, {base: './', allowEmpty: true})
				.pipe(gulp.dest(plugins.path.join(config.build, setting.sourse)))
				.on('end', function () {
					console.log('diff end');
					callback();
				});
		});
	};
};