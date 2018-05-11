let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch'); 
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;


gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('styles', function(callback){
    gulpSequence('sass', 'minify-css')(callback)
});
 

gulp.task('concat-js', function() {
  return gulp.src(["./js/jquery-3.2.1.slim.js", "./js/popper.js", "./js/bootstrap.js"])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('uglify', function () {
    return gulp.src("./js/all.js")
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest("./js/"));
});

gulp.task('js-style', function(callback){
    gulpSequence('concat-js', 'uglify')(callback)
})


gulp.task('watch', function () {
    gulp.watch(['./js/jquery-3.2.1.slim.js', './js/popper.js', './js/bootstrap.js'], ['js-style'])
    // gulp.watch('./js/all.js', ['uglify'])
    gulp.watch('./scss/*.scss', ['styles']);
});



const jscs = require('gulp-jscs');
 
gulp.task('report', () => {
    return gulp.src('js/all.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('fix', () => {
    return gulp.src('js/all.js')
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest('js/test'));
});

const eslint = require('gulp-eslint');
 
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['/js/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
 
gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});