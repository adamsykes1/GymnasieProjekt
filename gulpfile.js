var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function() {
  return gulp.src('assets/css/sass/**/*.sass')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('watch', function() {
  return gulp
    .watch('assets/css/sass/**/*.sass', ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch', 'nodemon'], function() {});
