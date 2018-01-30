
module.exports = function (gulp, plugins, config, setting) {
    return function () {
        return plugins.es.map(function (file, callback) {
            let options = {
                excludes: [
                    '$MESS',
                    '$GLOBALS',
                    '$_SERVER',
                    '$_GET',
                    '$_POST',
                    '$_FILES',
                    '$_REQUEST',
                    '$_SESSION',
                    '$_ENV',
                    '$_COOKIE',
                    '$php_errormsg',
                    '$HTTP_RAW_POST_DATA',
                    '$http_response_header',
                    '$argc',
                    '$argv',
                    '$this'
                ],
                minify: {
                    replace_variables: true,
                    remove_whitespace: true,
                    remove_comments: true,
                    minify_html: false
                },
                output: file.path
            };
            plugins.uglify.minify(file.path, options);
            callback(null, file);
        });
    };
};