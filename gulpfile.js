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
 
let js_files = ["./js/jquery-3.2.1.slim.js", "./js/popper.js", "./js/bootstrap.js", "./js/contact.js"]

gulp.task('concat-js', function() {
  return gulp.src(js_files)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('uglify', function () {
    return gulp.src("./js/all.js")
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest("./js/"));
});

gulp.task('styles', function(callback){
	gulpSequence('concat-js', 'uglify')(callback)
});

gulp.task('watch', function () {
	gulp.watch(js_files)
	gulp.watch('js/all.js', ['uglify'])
	gulp.watch('./scss/*.scss', ['styles']);
});

