(function() {
	'use strict';

	require(
		[
			// require all component dependencies
			'core/logger/ui/logger.module.js',
			'core/router/ui/router.module.js',
			'core/uie/ui/uie.module.js',
			'less!core/uie/ui/css/core.less',
			//require core components
			'core/uie/ui/util/baseUtil.factory.js',
			// baseLayout
			'core/uie/ui/layout/baseLayout.factory.js',
			'core/uie/ui/layout/baseLayout.controller.js',
			// baseTile
			'core/uie/ui/tile/baseTile.controller.js',
			'core/uie/ui/tile/baseTile.directive.js',
			// external loader
			'bower_components/ng-loaders/ngLoader.min.js',
			// external tooltips
			'bower_components/angular-tooltips/dist/angular-tooltips.min.js',
			// require installation component
			'components/sdk/ui/sdk.module.js',
			'components/tsk/ui/tsk.module.js'
		],
		function() {
			var core = angular
				// declare module
				.module('app.core', [
					'app.core.logger',
					'app.core.router',
					'app.core.uie',

					// external ui elements
					'ngLoader',
					'720kb.tooltips',

					// load installation components
					'app.sdk',
					'app.tsk',
				]);

			core
				.config(appConfig)
				.run(appRun)
				.service('coreAPI', coreAPI);

			appConfig.$inject = [
				'$locationProvider',
				'$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide'
			];

			// saving references of providers to allow lazy loading and declaration of modules
			function appConfig($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
				core.controller = $controllerProvider.register;
				core.directive = $compileProvider.directive;
				core.filter = $filterProvider.register;
				core.factory = $provide.factory;
				core.service = $provide.service;
			};

			appRun.$inject = [
				'routerHelper'
			];

			function appRun(routerHelper) {
				// declare default route
				// only CORE can declare default route
				var otherwise = '/404';
				routerHelper.configureStates(getStates(), otherwise);
			};

			// definition of routes
			function getStates() {
				return [{
					state: '404',
					config: {
						url: '/404',
						templateUrl: 'core/uie/ui/404page/404.view.html',
						title: '404'
					}
				}];
			};

			// definition of API properties and services
			function coreAPI() {
				this.endpoints = {
					icon: {
						list: 'core/uie/be/icon/icons.json'
					}
				};
			};

			// angular bootstrap to initialize app
			// only CORE can initialize app
			angular.bootstrap(document, ['app']);

		});
})();
