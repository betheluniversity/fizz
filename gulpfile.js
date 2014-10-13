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
	plumber		= require('gulp-plumber'),
	autoprefixer= require('gulp-autoprefixer'),
	imagemin	= require('gulp-imagemin');

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
		.pipe(plumber())
		.pipe(sass({ outputStyle:'compressed', debug:true })) // compress styles
		.pipe(autoprefixer({browsers:['last 2 versions']}))
		.pipe(gulp.dest(outputDir + '/css')) // sending to output directory
		.pipe(reload({stream:true})); // inject into browser using browserSync
});

gulp.task('images', function(){
	gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(outputDir + '/images'));
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

// browser-sync task for starting the server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: outputDir
		}
	});
});

// Clean output directory before saving new 
gulp.task('clean', function(){
	return gulp.src(outputDir + '/*', {read:false})
		.pipe(clean());
})

gulp.task('default', ['clean','js','styles','images','assemble','browser-sync'], function() {
	gulp.watch('./src/scss/**/*.scss', ['scss'])
	gulp.watch('./src/templates/**/*.hbs', ['assemble']);
	gulp.watch('./src/js/*.js', ['js', browserSync.reload]);
});