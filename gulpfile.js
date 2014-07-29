var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var paths = {
  engine: [
    './js/plugins/inherits.js',
    './js/ext/*.js',
    './js/rts.js',
    './js/rts/websockets_adapter.js',
    './js/rts/services.js',
    './js/rts/services/*.js',
    './js/rts/abilities.js',
    './js/rts/abilities/*.js',
    './js/rts/message_handlers.js',
    './js/rts/message_handlers/*.js',
    './js/rts/controllers/scripts/*.js',
    './js/rts/controllers/*.js',
    './js/rts/prefabs/*.js',
    './js/rts/prefabs/buildings/*.js',
    './js/rts/prefabs/units/*.js',
    './js/rts/prefabs/resources/*.js',
    './js/rts/prefabs/minimap/*.js',
    './js/rts/game.js',
    './js/rts/player.js',
    './js/rts/human_player.js',
    './js/rts/network_player.js',
    './js/rts/hud.js',
    './js/rts/startpoint.js',
    './js/rts/match.js',
    './js/rts/window.js'
  ],
  application: [
    './js/matchmaking.js',
    './js/services/*.js',
    './js/controllers/*.js',
  ],
  stylesheets: './scss/*.scss'
};

gulp.task('sass', function () {
  return gulp.src(paths.stylesheets)
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('engine', function() {
 gulp.src(paths.engine)
    .pipe(concat('engine.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('engine.min', function() {
 return gulp.src(paths.engine)
    .pipe(uglify())
    .pipe(concat('engine.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('application', function() {
 gulp.src(paths.application)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('application.min', function() {
 return gulp.src(paths.application)
    .pipe(uglify())
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.engine, ['engine']);
  gulp.watch(paths.application, ['application']);
  gulp.watch(paths.stylesheets, ['sass']);
});

gulp.task('default', ['engine', 'application', 'sass', 'watch']);
