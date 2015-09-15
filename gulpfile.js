var gulp 		= require('gulp'),
	assemble 	= require('assemble'),
	browserify 	= require('browserify'), 
	source 		= require('vinyl-source-stream'),
	browserSync	= require('browser-sync'),  // http://www.browsersync.io/docs/gulp/
	reload		= browserSync.reload,
	del 		= require('del'),
	// svgSprite   = require("gulp-svg-sprites");
	critical 	= require('critical').stream;
	vinylPaths 	= require('vinyl-paths');

var $ = require('gulp-load-plugins')();

var outputDir = './builds/';

// JS task
gulp.task('js', function(){
	return browserify('./src/js/main')
		.bundle()
		.pipe(source('boots.js'))
		.pipe($.streamify($.uglify())) // compress on output
		.pipe(gulp.dest(outputDir + '/js'));
});

// CSS styles task
gulp.task('styles', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe($.sass({ outputStyle:'compressed', debug:true })) // compress styles
		.pipe($.autoprefixer({browsers:['last 2 versions', 'IE 9']}))
		.pipe(gulp.dest(outputDir + '/css')) // sending to output directory
		.pipe(reload({stream:true})); // inject into browser using browserSync
});

gulp.task('images', function(){
	gulp.src('./src/assets/images/*')
		.pipe($.imagemin())
		.pipe(gulp.dest(outputDir + '/assets/images'));
});

// ==========================
// Using Assemble (assemble.io) to compile handlebars templates
// var options = {
//     data: 'data/*.json',
//     partials: './src/templates/partials/*.hbs',
//     layoutdir: './src/templates/layouts/',
//     helpers: './node_modules/handlebars-helpers'
// };

gulp.task('assemble', function(){
	assemble.partials('./src/templates/partials/*.hbs');
	assemble.layouts(['./src/templates/layouts/*.hbs']);
	assemble.data(['./src/templates/data/*.json']);

	gulp.src('./src/templates/pages/*.hbs')
		.pipe($.assemble(assemble))
		.pipe($.rename({
			extname: ".html"
		}))
		.pipe(gulp.dest(outputDir + ''))
		.pipe(reload({stream:true}));
});

// gulp.task('assemble', function(){
// 	gulp.src('./src/templates/pages/*.hbs')
// 		.pipe(gulpAssemble(options))
// 		.pipe(gulp.dest(outputDir + ''))
// 		.pipe(reload({stream:true}));
// })

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

gulp.task('copystyles', function () {
    return gulp.src([outputDir + 'css/fizz.css'])
        .pipe($.rename({
            basename: "site"
        }))
        .pipe(gulp.dest(outputDir + 'css'));
});

// gulp.task('critical', function () {
// 	return gulp.src([outputDir + '*.html'])
// 		.pipe(
// 			critical({
// 				base: outputDir,
// 				inline: true,
// 				css: ['css/fizz.css'],
// 				// width: 414,
// 				// height: 736,
// 			})
// 		)
// 		.pipe(gulp.dest(outputDir));
// });

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src(outputDir + '*.html')
        .pipe(critical({
        	base: outputDir, 
        	// inline: true, 
        	css: [outputDir + '/css/fizz.css']
        }))
        .pipe(gulp.dest(outputDir));
});

// browser-sync task for starting the server
gulp.task('browser-sync', function() {
	browserSync({
		// tunnel: true,
		server: {
			baseDir: outputDir
		}
	});
});

// Clean output directory before saving new 
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
// gulp.task('clean', function (cb) {
// 	del([outputDir + '/*'], cb())
// 	// .on('error', console.error.bind(console));
// })

gulp.task('clean', function () {
  return gulp.src(outputDir + '/*')
    .pipe(gulp.dest(outputDir))
    .pipe(vinylPaths(del));
});

gulp.task('build', ['js','styles','images','copyfiles','assemble']);

gulp.task('default', ['js','styles','images','copyfiles','assemble','browser-sync'], function() {
	gulp.watch('./src/scss/**/*.scss', ['styles']);
	gulp.watch('./src/templates/**/*.hbs', ['assemble']);
	gulp.watch('./src/templates/**/*.json', ['assemble']);
	gulp.watch('./src/assets/icon-sprite/*.svg', ['sprites']);
	gulp.watch('./src/assets/filters/*.svg', ['copyfiles']);
	gulp.watch('./src/js/*.js', ['js', browserSync.reload]);
});