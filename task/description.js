/**
 * Создает содержимое для файла описания
 *
 * @param description
 * @param date
 * @returns {string}
 */

module.exports = function (gulp, plugins, config, setting) {
	return function (callback) {
		console.log('description start');
		plugins.git.exec({args: ` log --pretty=format:"%s" ${setting.diff}...${setting.version}`}, (error, content) => {
			if (error) {
				callback(error);
			}

			return plugins.file('description.ru', content, {src: true})
				.pipe(gulp.dest('./'))
				.on('end', function () {
					console.log('description stop');
					callback();
				});
		});
	};
};