'use strict';

/*
 npm install gulp@4.0.0 gulp-load-plugins gulp-batch-replace gulp-convert-encoding gulp-file gulp-git gulp-gzip gulp-load-plugins gulp-rename gulp-tar moment os del path --save
 */

module.exports = function (conf) {
    const config = {
        name: conf.name,
        build: 'build',
        dist: 'dist',
        test: 'test',
        tools: conf.tools,
        encode: conf.encode,
        path: [
            './**',
            '!{node_modules,node_modules/**}',
            '!{build,build/**}',
            '!{dist,dist/**}',
            '!{test,test/**}',
            '!*.js',
            '!*.json'
        ]
    };
    let setting = {
        file: config.name,
        sourse: config.name
    };

    let gulp = require('gulp');
    let plugins = require('gulp-load-plugins')();
    plugins.path = require('path');
    plugins.os = require('os');
    plugins.del = require('del');
    plugins.moment = require('moment');
    plugins.uglify = require('uglify-php');
    plugins.es = require('event-stream')
    plugins.getTask = function (task) {
        return require('./task/' + task)(gulp, plugins, config, setting);
    };
    plugins.log = function (task) {
        return function (callback) {
            console.log(task);
            callback();
        };
    };

    let app = {
        last_version: plugins.getTask('build_last_version'),
        release: plugins.getTask('build_release'),
        update: plugins.getTask('build_update')
    };
    return app;
}