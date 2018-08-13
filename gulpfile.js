const config        = require('./config');
const gulp          = require('gulp');
const webpackStream = require('webpack-stream');

gulp.task('webpack', function() {
    return gulp.src('./src/index/index.jsx')
        .pipe(webpackStream(config.getWebpackConfig('production')))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', gulp.parallel('webpack'));
