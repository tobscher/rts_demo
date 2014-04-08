var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

var paths = {
  scripts: ['js/**/*.js'],
  stylesheets: 'scss//**/*'
};

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
 return gulp.src(paths.scripts)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts.min', function() {
 return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylesheets, ['scss']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
