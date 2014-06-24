var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var paths = {
  scripts: [
    './js/plugins/*.js',
    './js/ext/*.js',
    './js/core/game_object.js',
    './js/core/world_object.js',
    './js/core/*.js',
    './js/rts/**/*.js',
    './js/*.js'
  ],
  stylesheets: './scss/*.scss'
};

gulp.task('sass', function () {
  return gulp.src(paths.stylesheets)
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
 gulp.src(paths.scripts)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts.min', function() {
 return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylesheets, ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
