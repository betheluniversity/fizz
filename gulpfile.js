var gulp 		= require('gulp'),
	assemble 	= require('assemble'),
	webpack 	= require('webpack-stream');
	source 		= require('vinyl-source-stream'),
	browserSync	= require('browser-sync'),  // http://www.browsersync.io/docs/gulp/
	reload		= browserSync.reload,
	del 		= require('del'),
	// svgSprite   = require("gulp-svg-sprites");
	vinylPaths 	= require('vinyl-paths'),
	jshint		= require('gulp-jshint'),
	postcss 	= require('gulp-postcss'),
	nano 	   	= require('gulp-cssnano'), 
    precss		= require('precss'),
    autoprefixer= require('autoprefixer');

var $ = require('gulp-load-plugins')();
var outputDir = './builds/';

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(postcss([
        	precss({prefix:''}),
        	autoprefixer({browsers: ['last 2 versions']})
        ]))
        .pipe(nano())
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function(){
	return gulp.src('./src/js/main.js')
		.pipe(webpack({
			output: {filename: 'webpack.js',},
		  	module: {
		  		noParse: [/.\/src\/js\/odometer.min.js/],
		  		loaders: [{
		    			test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
		    	        loader: 'imports?define=>false&this=>window'
		  		}]
		  	},
		  	plugins: [new webpack.webpack.optimize.UglifyJsPlugin({ output: {comments:false}})]
		}))
		.pipe(gulp.dest(outputDir + '/js'));
});

// excluding Odometer because it has lots of issues
gulp.task('lint', function() {
    return gulp.src(['src/js/*.js','!src/js/odometer.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
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
	gulp.src('./src/assets/filters/*.svg')
		.pipe(gulp.dest(outputDir + '/assets/filters'))
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		// tunnel: true,
		server: {
			baseDir: outputDir
		}
	});
});

gulp.task('clean', function () {
  return gulp.src(outputDir + '/*')
    .pipe(gulp.dest(outputDir))
    .pipe(vinylPaths(del));
});

gulp.task('build', ['js','css','copyfiles','assemble']);

gulp.task('default', ['js','css','copyfiles','assemble','browser-sync'], function() {
	gulp.watch('./src/css/**/*.css', ['css']);
	gulp.watch('./src/templates/**/*.hbs', ['assemble']);
	gulp.watch('./src/templates/**/*.json', ['assemble']);
	gulp.watch('./src/assets/icon-sprite/*.svg', ['sprites']);
	gulp.watch('./src/assets/filters/*.svg', ['copyfiles']);
	gulp.watch('./src/js/*.js', ['js']);
});