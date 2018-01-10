
module.exports = function (gulp, plugins, config, setting) {
    return function () {
        console.log('clean_sourse');
        return plugins.del(plugins.path.join(config.build, setting.sourse));
    };
};