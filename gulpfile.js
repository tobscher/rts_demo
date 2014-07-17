var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var paths = {
  scripts: [
    './js/plugins/inherits.js',
    './js/ext/*.js',
    './js/rts.js',
    './js/rts/websockets_adapter.js',
    './js/rts/services.js',
    './js/rts/services/*.js',
    './js/rts/abilities.js',
    './js/rts/abilities/*.js',
    './js/rts/controllers/scripts/*.js',
    './js/rts/controllers/*.js',
    './js/rts/prefabs/*.js',
    './js/rts/prefabs/buildings/*.js',
    './js/rts/prefabs/units/*.js',
    './js/rts/prefabs/resources/*.js',
    './js/rts/game.js',
    './js/rts/hud.js',
    './js/rts/match.js'
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
