var gulp 		= require('gulp'),
	fs			= require('fs'),
	assemble 	= require('assemble'),
	webpack 	= require('webpack-stream');
	source 		= require('vinyl-source-stream'),
	browserSync	= require('browser-sync'),
	reload		= browserSync.reload,
	del 		= require('del'),
	// svgSprite   = require("gulp-svg-sprites");
	vinylPaths 	= require('vinyl-paths'),
	eslint		= require('gulp-eslint'),
	postcss 	= require('gulp-postcss'),
	cssnano  	= require('gulp-cssnano'), // minimize css
    // precss		= require('precss'),
    autoprefixer= require('autoprefixer');

var $ = require('gulp-load-plugins')();
var outputDir = './builds/';

gulp.task('css', function () {
	var plugins = [
		require('postcss-easy-import'),
		require('postcss-mixins'),
		require('postcss-nested'),
		require('postcss-simple-vars'),
		// precss({prefix:''}),
		autoprefixer({browsers: ['last 2 versions']})
	];
    return gulp.src('src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function(){
	return gulp.src('./src/js/main.js')
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest(outputDir + '/js/'))
		.pipe(reload({stream:true}));
});

// excluding Odometer because it has lots of issues
gulp.task('jslint', function() {
    return gulp.src(['src/js/*.js','!src/js/vendor/odometer.min.js'])
	.pipe(eslint({
		extends: 'eslint:recommended',
		ecmaFeatures: {'modules': true},
		globals: {'$':true},
		envs: ['browser']
	}))
	.pipe(eslint.formatEach('compact', process.stderr));
});

// ==========================

var app = assemble();

gulp.task('load', function(cb) {
  app.partials('src/templates/partials/*.hbs');
  app.layouts('src/templates/layouts/*.hbs');
  app.pages('src/templates/pages/*.hbs');
  app.data('src/templates/data/*json');
  cb();
});

gulp.task('assemble', ['load'], function() {
  return app.toStream('pages')
    .pipe(app.renderFile())
	.pipe($.rename({
		extname: ".html"
	}))
    .pipe(app.dest(outputDir + ''))
    .pipe(reload({stream:true}));
});

// ===========================

// http://css-tricks.com/svg-symbol-good-choice-icons
// https://github.com/jkphl/svg-sprite
var config = {
	"mode": {
		"symbol":true
	}
};

gulp.task('sprites', function(){
	return gulp.src('./src/assets/icon-sprite/*.svg')
	    .pipe($.svgSprite(config))
	    .pipe(gulp.dest(outputDir + '/assets/icon-sprite'));
});


gulp.task('copyfiles', function(){
	gulp.src('./src/assets/**')
		.pipe(gulp.dest(outputDir + '/assets'))
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		// tunnel: true,
		server: {
			baseDir: outputDir
		},
		browser: "Google Chrome"
	});
});

gulp.task('clean', function () {
  return gulp.src(outputDir + '/*')
    .pipe(gulp.dest(outputDir))
    .pipe(vinylPaths(del));
});

gulp.task('build', ['js','css','copyfiles','assemble']);

gulp.task('serve', ['js','css','copyfiles','assemble','browser-sync'], function() {
	gulp.watch('./src/css/**/*.css', ['css']);
	gulp.watch('./src/templates/**/*.hbs', ['assemble']);
	gulp.watch('./src/templates/**/*.json', ['assemble']);
	gulp.watch('./src/assets/icon-sprite/*.svg', ['sprites']);
	gulp.watch('./src/assets/filters/*.svg', ['copyfiles']);
	gulp.watch('./src/js/*.js', ['js']);
});