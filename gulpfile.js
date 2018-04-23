var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    compass = require('gulp-compass');
 
gulp.task('compress-js', function (cb) {
    pump(
        [
            gulp.src('script/*.js'),
            uglify(),
            gulp.dest('dist/script/')
        ],
        cb
    );
});
gulp.task('compress-css', function() {
    return gulp.src('./style/*.scss')
        .pipe(compass({
            css: './dist/style/',
            sass: './style',
            image: './images',
            comments: true,
            require: ['modular-scale'],
            environment: 'production'
        }));
});
