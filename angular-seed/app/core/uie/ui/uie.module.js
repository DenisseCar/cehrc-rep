(function() {
	'use strict';

	var app = angular
		.module('app.core.uie', []);

	app
		.config(appConfig);

	appConfig.$inject = [
		'$locationProvider',
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide'
	];

	// saving references of providers to allow lazy loading and declaration of modules
	function appConfig($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service = $provide.service;
	};

})();