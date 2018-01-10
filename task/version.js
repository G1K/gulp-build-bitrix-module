
/**
 * Создает содержимое для файла версии
 *
 * @param version
 * @param date
 * @returns {string}
 */

module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('version start');
        const content = `<?
$arModuleVersion = array(
\t"VERSION" => "${ setting.version }",
\t"VERSION_DATE" => "${ setting.date }"
);
?>`;
        return plugins.file('version.php', content, {src: true})
                .pipe(gulp.dest('install'))
                .on('end', function() {
                    console.log('version stop');
                    callback();
                });
    };
};