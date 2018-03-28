
module.exports = function (gulp, plugins, config, setting) {
    return function (callback) {
        console.log('version-tools start');
        if (setting.tools) {
            return callback();
        }
        setting.tools = [];
        setting.files = [];
        plugins.git.exec({args: 'submodule status'}, (error, output) => {
            if (error) {
                throw error;
            }
            if (config.tools) {
                output.split(plugins.os.EOL).map((rev) => {
                    rev = rev.trim().split(' ');
                    if (config.tools[rev[1]]) {
                        let item = config.tools[rev[1]];
                        rev = rev[0].replace(/[^a-z0-9]/g, '');
                        setting.tools.push([item[0] + '\\' + item[1], item[0] + '\\Ver' + rev + '\\' + item[1]]);
                    }
                });
            }
            console.log('version-tools stop');
            callback();
        });
    };
};