var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso')

gulp.task('less', function() {
	return gulp.src('./less/style.less')
		.pipe(plumber())
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
			}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
	gulp.watch('./less/**/*.less', ['less']);
	gulp.watch('*.html').on('change', browserSync.reload);
});