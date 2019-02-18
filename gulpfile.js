var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var csss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver')

gulp.task('devSass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(csss())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('devJs', function() {
    return gulp.src('./src/js/page/*.js')
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./src/js/'));
})

gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true,
            open: true
        }))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('devSass'))
})

// default
gulp.task('default', gulp.series('devSass', 'devJs', 'devServer', 'watch'));

gulp.task('js', function() {
    return gulp.series('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'))
})
gulp.task('css', function() {
    return gulp.series('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'))
})


// build
gulp.task('build', gulp.series('js', 'css'));