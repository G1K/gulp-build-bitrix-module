
module.exports = function (gulp, plugins, config, setting) {
    return function () {
        console.log('clean');
        return plugins.del(config.build);
    };
};