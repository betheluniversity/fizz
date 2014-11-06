var gulp 		= require('gulp'),
	browserify 	= require('browserify'), 
	source 		= require('vinyl-source-stream'),
	uglify 		= require('gulp-uglify'),
	streamify 	= require('gulp-streamify'),
	sass		= require('gulp-sass'),
	browserSync	= require('browser-sync'),  // http://www.browsersync.io/docs/gulp/
	reload		= browserSync.reload,
	assemble	= require('gulp-assemble'),
	clean		= require('gulp-clean'),
	autoprefixer= require('gulp-autoprefixer'),
	imagemin	= require('gulp-imagemin'),
	del 		= require('del'),
	svgSprite   = require("gulp-svg-sprites");

var outputDir = './builds/';

// JS task
gulp.task('js', function(){
	return browserify('./src/js/main')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(streamify(uglify())) // compress on output
		.pipe(gulp.dest(outputDir + '/js'));
});

// CSS styles task
gulp.task('styles', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass({ outputStyle:'compressed', debug:true })) // compress styles
		.pipe(autoprefixer({browsers:['last 2 versions']}))
		.pipe(gulp.dest(outputDir + '/css')) // sending to output directory
		.pipe(reload({stream:true})); // inject into browser using browserSync
});

gulp.task('images', function(){
	gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(outputDir + '/assets/images'));
})

// ==========================
// Using Assemble (assemble.io) to compile handlebars templates
var options = {
    data: 'data/*.json',
    partials: './src/templates/partials/*.hbs',
    layoutdir: './src/templates/layouts/',
    helpers: './node_modules/handlebars-helpers'
};

gulp.task('assemble', function(){
	return gulp.src('./src/templates/pages/*.hbs')
		.pipe(assemble(options))
		.pipe(gulp.dest(outputDir + ''))
		.pipe(reload({stream:true}));
})
// ===========================

// https://github.com/shakyShane/gulp-svg-sprites
// This task add all the src files in gulp.src to an icon sprite
gulp.task('sprites', function () {
    return gulp.src('./src/assets/icon-sprite/*.svg')
        .pipe(svgSprite({
        	mode:"symbols",
        	preview: false,
        	svg: {
        		symbols:"symbols.svg"}
        		}
        	))
        .pipe(gulp.dest(outputDir + '/assets/icon-sprite'));
});

gulp.task('copyfiles', function(){
	gulp.src('./src/assets/filters/*.svg')
	.pipe(gulp.dest(outputDir + '/assets/filters'))
	.pipe(reload({stream:true}));
})

// browser-sync task for starting the server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: outputDir
		}
	});
});

// Clean output directory before saving new 
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function (cb) {
	del([outputDir + '/*'], cb())
	// .on('error', console.error.bind(console));
})

gulp.task('default', ['js','styles','images','sprites','copyfiles','assemble','browser-sync'], function() {
	gulp.watch('./src/scss/**/*.scss', ['styles']);
	gulp.watch('./src/templates/**/*.hbs', ['assemble']);
	gulp.watch('./src/assets/icon-sprite/*.svg', ['sprites']);
	gulp.watch('./src/assets/filters/*.svg', ['copyfiles']);
	gulp.watch('./src/js/*.js', ['js', browserSync.reload]);
});