
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('version-tags start');
        /**
         * Проверка на число
         * @param n
         * @returns {boolean}
         */
        const isNumeric = n => {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        /**
         * Парсит вывод от команды git tag
         * @param log
         */
        const parseVersions = log => {
            let tags = log.trim().split(plugins.os.EOL);
            if (tags.length <= 1) {
                // Если версий нет, то подменим вывод
                tags.push(plugins.moment().format() + '\trefs/tags/0.0.1');
            }
            return tags.map((tag) => {
                let match = tag.split('\t');
                if (match.length > 1) {
                    let date = plugins.moment(match[0].trim()).format('YYYY-MM-DD HH:mm:ss');
                    let version = match[1].replace('refs/tags/', '');
                    // Используем только теги формата:
                    // 1.0
                    // 1.0.0
                    // ради этого подключать semver нет смысла
                    const versionArray = version.split('.');
                    if (versionArray.length < 2 || versionArray.length > 3) {
                        return null;
                    }
                    if (versionArray.length === 2) {
                        versionArray[2] = 0;
                    }
                    if (!isNumeric(versionArray[0]) || !isNumeric(versionArray[1]) || !isNumeric(versionArray[2])) {
                        return null;
                    }
                    version = versionArray.join('.');
                    return {
                        version: version,
                        date: date
                    };
                }
            }).filter(tag => {
                return tag !== null;
            });
        };

        if (setting.version) {
            return callback();
        }
        plugins.git.exec({args: 'tag --sort=-creatordate --format=\'%(creatordate:rfc)%09%(refname)\''}, (error, output) => {
            if (error) {
                throw error;
            }
            setting.versions = parseVersions(output);
            setting.version = setting.versions[0].version;
            setting.diff = setting.versions[1] ? setting.versions[1].version : setting.versions[0].version;
            setting.date = setting.versions[0].date;
            console.log('version-tags stop');
            callback();
        });
    };
};