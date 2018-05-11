// gulpfile.js Coffee World project
//
let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch'); 
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;

// Compile sass files into ./css/styles.css
//
gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

// Minify css in styles.css and name ./css/styles.min.css
//
gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});

// Combine compile sass and minify tasks into one gulp styles task
//
gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});

// Assign js files to be concatenated, order is important:
// jQuery first, then Popper.js, then Bootstrap JS, then any other js
//
let js_files = ["./js/jquery-3.2.1.slim.js",
                "./js/popper.js", 
                "./js/bootstrap.js", 
                "./js/contact.js"]

// Concatenate js files into ./js/all.js
//
gulp.task('concat-js', function() {
  return gulp.src(js_files)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/'));
});

// Uglify (minify) .js/all.js file and name ./js/all.min.js
//
gulp.task('uglify', function () {
    return gulp.src("./js/all.js")
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest("./js/"));
});

// Combine concat and uglify js files tasks into one js-style task
//
gulp.task('js-style', function(callback){
    gulpSequence('concat-js', 'uglify')(callback)
})

// gulp watch task to run gulp js-styles and gulp styles if
// anything changes 
//
gulp.task('watch', function () {
	gulp.watch(js_files, ['js-style']);
    gulp.watch(js_files_test, ['lint']);
	gulp.watch('./scss/*.scss', ['styles']);
});

// Check JavaScript code style with ESLint
//
const eslint = require('gulp-eslint');

let js_files_test = ["./js/contact.js"];

gulp.task('lint', () => {
    return gulp.src(js_files_test)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
 
// gulp.task('default', ['lint'], function () {
//     // This will only run if the lint task is successful...
// });
