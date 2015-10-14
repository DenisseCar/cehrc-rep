(function() {
	'use strict';

	var tsk = angular
		// declare module
		.module('app.tsk', []);

	tsk
		.config(appConfig)
		.run(appRun)
		.service('tskAPI', tskAPI);

	appConfig.$inject = [
		'$locationProvider',
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide'
	];

	// saving references of providers to allow lazy loading and declaration of modules
	function appConfig($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		tsk.controller = $controllerProvider.register;
		tsk.directive = $compileProvider.directive;
		tsk.filter = $filterProvider.register;
		tsk.factory = $provide.factory;
		tsk.service = $provide.service;
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
			state: 'tsk',
			config: {
				url: '/tsk',
				title: 'TSK',
				dependencies: [
					'less!components/tsk/ui/css/tsk.less'
				],
				views: {
					// targets 'main' ui-view in 'tsk' state
					'main@tsk': {
						templateUrl: 'components/tsk/ui/tsk.view.html',
						dependencies: [
							'components/tsk/ui/tsk.controller.js'
						]
					}
				}
			}
		}];
	};

	// definition of API properties and services
	function tskAPI() {
		this.endpoints = {
			app: {
				list: 'components/tsk/be/app/apps.json'
			}
		};
	};
})();