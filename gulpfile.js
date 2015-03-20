var gulp 		= require('gulp'),
	assemble 	= require('assemble'),
	browserify 	= require('browserify'), 
	source 		= require('vinyl-source-stream'),
	browserSync	= require('browser-sync'),  // http://www.browsersync.io/docs/gulp/
	reload		= browserSync.reload,
	del 		= require('del'),
	// svgSprite   = require("gulp-svg-sprites");
	critical 	= require('critical');
	vinylPaths 	= require('vinyl-paths');

var $ = require('gulp-load-plugins')();

var outputDir = './builds/';

// JS task
gulp.task('js', function(){
	return browserify('./src/js/main')
		.bundle()
		.pipe(source('bundle.js'))
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
})

// ==========================
// Using Assemble (assemble.io) to compile handlebars templates
// var options = {
//     data: 'data/*.json',
//     partials: './src/templates/partials/*.hbs',
//     layoutdir: './src/templates/layouts/',
//     helpers: './node_modules/handlebars-helpers'
// };

// setup items on the assemble object
assemble.partials('./src/templates/partials/*.hbs');
assemble.layouts(['./src/templates/layouts/*.hbs']);

gulp.task('assemble', function(){
	gulp.src('./src/templates/pages/*.hbs')
		.pipe($.assemble(assemble))
		.pipe($.rename({
			extname: ".html"
		}))
		.pipe(gulp.dest(outputDir + ''))
		.pipe(reload({stream:true}));
})

// gulp.task('assemble', function(){
// 	gulp.src('./src/templates/pages/*.hbs')
// 		.pipe(gulpAssemble(options))
// 		.pipe(gulp.dest(outputDir + ''))
// 		.pipe(reload({stream:true}));
// })

// ===========================

// https://github.com/shakyShane/gulp-svg-sprites
// http://css-tricks.com/svg-symbol-good-choice-icons/
// This task add all the src files in gulp.src to an icon sprite
// gulp.task('sprites', function () {
//     return gulp.src('./src/assets/icon-sprite/*.svg')
//         .pipe(svgSprite({
//         	mode:"symbols",
//         	preview: false,
//         	baseSize: 16,
//         	svg: {
//         		symbols:"symbols.svg"
//         	}
//    			}
//         	))
//         .pipe(gulp.dest(outputDir + '/assets/icon-sprite'));
// });

gulp.task('copyfiles', function(){
	gulp.src('./src/assets/filters/*.svg')
		.pipe(gulp.dest(outputDir + '/assets/filters'))
		.pipe(reload({stream:true}));
})


gulp.task('copystyles', function () {
    return gulp.src([outputDir + 'css/fizz.css'])
        .pipe($.rename({
            basename: "site"
        }))
        .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('critical',['build'], function (cb) {

    // At this point, we have our
    // production styles in main/styles.css

    // As we're going to overwrite this with
    // our critical-path CSS let's create a copy
    // of our site-wide styles so we can async
    // load them in later. We do this with
    // 'copystyles' above

	critical.generate({
		base: outputDir,
		src: 'index.html',
		dest: 'css/critical.css',
		width: 730,
		height: 1000
	}, function(err, output){
        console.log("critical completed")
	});
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
	gulp.watch('./src/assets/icon-sprite/*.svg', ['sprites']);
	gulp.watch('./src/assets/filters/*.svg', ['copyfiles']);
	gulp.watch('./src/js/*.js', ['js', browserSync.reload]);
});