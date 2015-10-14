(function() {
	'use strict';

	var sdk = angular
		// declare module
		.module('app.sdk', ['ngDialog'])

	sdk
		.config(appConfig)
		.run(appRun);

	appConfig.$inject = [
		'$locationProvider',
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide'
	];

	// saving references of providers to allow lazy loading and declaration of modules
	function appConfig($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		sdk.controller = $controllerProvider.register;
		sdk.directive = $compileProvider.directive;
		sdk.filter = $filterProvider.register;
		sdk.factory = $provide.factory;
		sdk.service = $provide.service;
	};

	appRun.$inject = [
		'routerHelper'
	];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	};

	// definition of routes
	function getStates() {
		return [{
			state: 'sdk',
			config: {
				url: '/sdk',
				title: 'SDK',
				dependencies: [
					'less!components/sdk/ui/css/sdk.less'
				],
				views: {
					// targets 'sidebar' ui-view in 'sdk' state
					'sidebar@sdk': {
						templateUrl: 'components/sdk/ui/sdk.view.html',
						dependencies: [
							'components/sdk/ui/sdk.controller.js'
						]
					}
				}
			}
		}, {
			state: 'sdk.icon',
			config: {
				url: '/icon',
				title: 'SDK - Icon Library',
				views: {
					// targets 'main' ui-view in parent state
					'main': {
						templateUrl: 'components/sdk/ui/icon/icon.view.html',
						dependencies: [
							'components/sdk/ui/icon/icon.controller.js'
						]
					}
				}
			}
		}, {
			state: 'sdk.loader',
			config: {
				url: '/loader',
				title: 'SDK - Loader',
				views: {
					'main': {
						templateUrl: 'components/sdk/ui/loader/loader.view.html',
						dependencies: [
							'components/sdk/ui/loader/loader.controller.js'
						]
					}
				}
			}
		}, {
			state: 'sdk.tooltip',
			config: {
				url: '/tooltip',
				title: 'SDK - Tooltip',
				views: {
					'main': {
						templateUrl: 'components/sdk/ui/tooltip/tooltip.view.html',
						dependencies: [
							'components/sdk/ui/tooltip/tooltip.controller.js'
						]
					}
				}
			}
		}];
	};
})();
