
var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
 
// Define some paths.
var paths = {
  main: ['./src/js/main.js'],
  js: ['./src/js/*.js'],
  jsx: ['./src/jsx/*.jsx'],
  css: ['./src/scss/*.scss']
};
 
// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
gulp.task('clean', function(done) {
  del(['build'], done);
});
 
// Our CSS task. It finds all our Stylus files and compiles them.
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('./build/'));
});
 
// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(paths.main)
    .transform(reactify)
    .bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./build/'));
});

// browser reload
gulp.task('browser-sync', function() {
    browserSync.init(['*.html', './build/*'], {
        server: {
            baseDir: './'
        }
    });
});
 
// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch([paths.js, paths.jsx], ['js']);
});
 
// The default task (called when we run `gulp` from cli)
gulp.task('default', ['css', 'js', 'browser-sync', 'watch']);

