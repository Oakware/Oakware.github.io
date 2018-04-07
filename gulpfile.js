const webpack   = require('webpack');
const config    = require('./webpack.config');
const gulp      = require('gulp');
const gutil     = require('gulp-util');

gulp.task("webpack", function(callback) {
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('default', ['webpack']);
