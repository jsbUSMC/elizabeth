// Load Node Modules/Plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
var gutil = require('gulp-util');

const config = {
    bsDir: './node_modules/bootstrap/scss'
}
const reload = browserSync.reload;
const $ = gulpLoadPlugins();

// Remove existing docs and dist build
gulp.task('clean', del.bind(null, ['dist']));


// Build LibSass files
gulp.task('styles', function() {
  gulp.src('./src/scss/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        includePaths: config.bsDir
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write('.'))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/css'));
});



// Build JavaScript files 
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe($.babel())
    .pipe($.concat('./all.js'))
    .pipe(gulp.dest('dist/js'));
});

 



// Watch tasks
gulp.task('watch', function() {     
       gulp.watch('scss/*.scss', ['styles']);
       gulp.watch('js/src/*.js', ['scripts']);
});

gulp.task('dist', ['styles', 'scripts']);

gulp.task('default', ['clean'], () => {
  gulp.start('dist');
});