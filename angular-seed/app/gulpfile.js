var gulp = require('gulp');
var concat = require('gulp-concat');
var server = require('gulp-express');

gulp.task('default', function () {
	//JS Concat
	gulp.src([
			'bower_components/lodash/lodash.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-aria/angular-aria.min.js',
			// 'bower_components/angular-route/angular-route.min.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/angular-messages/angular-messages.min.js',
			'bower_components/angular-material/angular-material.min.js',
			'bower_components/angular-resource/angular-resource.min.js',
			'bower_components/angular-animate/angular-animate.min.js'
		])
		.pipe(concat('thirdparty.min.js'))
		.pipe(gulp.dest('public/js/'));

	gulp.src([
			'public/fenix.js',
			'public/**/controller.js'
		])
		.pipe(concat('fenix.concat.js'))
		.pipe(gulp.dest('public/'));

	//JS Direct copy
	gulp.src([
			'bower_components/jquery/dist/jquery.min.map',
			'bower_components/angular-aria/angular-aria.min.js.map',
			'bower_components/angular-route/angular-route.min.js.map',
			'bower_components/angular-animate/angular-animate.min.js.map',
			'bower_components/angular-resource/angular-resource.min.js.map',
			'bower_components/angular-messages/angular-messages.min.js.map',
			'bower_components/gss/dist/gss.min.js'
		])
		.pipe(gulp.dest('public/js/'));

	//CSS Concat
	gulp.src([
			'bower_components/angular/angular-csp.css',
			'bower_components/angular-material/angular-material.css',
			'bower_components/angular-material/angular-material.min.css',
			'bower_components/bootstrap/dist/css/bootstrap.min.css'
		])
		.pipe(concat('thirdparty.min.css'))
		.pipe(gulp.dest('public/css/'));

	//Bootstrap fonts
	gulp.src([
			'bower_components/bootstrap/fonts/glyphicons-*.*'
		])
		.pipe(gulp.dest('public/fonts/'));
	
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);

    require('./hana_router.js');

    gulp.watch(['public/fenix.js', 'public/**/controller.js'], function (event) {
    	gulp.run('default')
    });

    gulp.watch(['app/**/*.html'], server.notify);
    gulp.watch(['public/css/**/*.less'], server.notify);
 
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
})