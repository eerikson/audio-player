const browserify = require( 'browserify' );
const gulp = require( 'gulp' );
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );
const sourcemaps = require( 'gulp-sourcemaps' );
const autoprefixer = require( 'gulp-autoprefixer' );
const connect = require( 'gulp-connect' );
const babelify = require( 'babelify' );
const sass = require( 'gulp-sass' );
const uglify = require( 'gulp-uglify' );
const gzip = require('gulp-gzip');
const cleanCSS = require('gulp-clean-css');

const paths = {
	src : {
		scripts : './src/js/',
		styles : './src/css/'
	},
	dist : {
		scripts : './dist/js/',
		styles : './dist/css/'
	}
};

/*
*  Run a simple local webserver.
*  Use port 80, which looks prettier, but requires admin privileges.
*/
gulp.task( 'server', () => {
	connect.server({
		root: 'dist',
		port: 80
	});
});


gulp.task( 'scripts', () => {
	const b = browserify({
		entries: paths.src.scripts + 'main.js',
		extensions : [ '.jsx' ],
		debug: false
	}).transform( 'babelify', { presets: [ 'es2015', 'react' ] } )
	

	return b.bundle()
		.pipe( source('main.js') )
		.pipe( buffer() )
		.pipe( gulp.dest( paths.dist.scripts) );
});


gulp.task( 'styles', () => {
	return gulp.src( paths.src.styles + '/main.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe( gulp.dest( paths.dist.styles ) );
});

gulp.task( 'compress-js', () => {
	return gulp.src( 'dist/js/*.js' )
		.pipe( uglify() )
		.pipe( gzip( { append: false } ) )
		.pipe( gulp.dest( 'dist/js' ) );
});

gulp.task( 'compress-css', () => {
	return gulp.src( 'dist/css/*.css' )
		.pipe( cleanCSS() )
		.pipe( gzip( { append: false } ) )
		.pipe( gulp.dest( 'dist/css' ) );
});


/*
*  Watch files for changes.
*/
gulp.task( 'watch', () => {
	gulp.watch( paths.src.scripts + '**/*.*', [ 'scripts' ] );
	gulp.watch( paths.src.styles + '**/*.*', [ 'styles' ] );
});

/*
*  Default task.
*/
gulp.task( 'default', [ 'watch', 'scripts', 'styles' ] );
