(function() {
	'use strict';

	angular
		.module('app.core.router', [
			'ui.router',
			'app.core.logger'
		])
		.provider('routerHelper', routerHelperProvider);

	routerHelperProvider.$inject = [
		'$locationProvider',
		'$stateProvider',
		'$urlRouterProvider'
	];

	function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
		var config = {
			docTitle: undefined,
			resolveAlways: {}
		};

		// delete hashes from URL
		// $locationProvider.html5Mode(true);

		this.configure = function(cfg) {
			angular.extend(config, cfg);
		};

		this.$get = RouterHelper;
		RouterHelper.$inject = [
			'$location',
			'$rootScope',
			'$state',
			'logger'
		];

		function RouterHelper($location, $rootScope, $state, logger) {
			var handlingStateChangeError = false;
			var hasOtherwise = false;
			var stateCounts = {
				errors: 0,
				changes: 0
			};

			var service = {
				configureStates: configureStates,
				getStates: getStates,
				stateCounts: stateCounts
			};

			init();

			return service;

			function configureStates(states, otherwisePath) {
				states.forEach(function(state) {
					var dependencies = [];
					// get dependencies from config and views
					if (state.config.dependencies && state.config.dependencies.length) {
						dependencies = dependencies.concat(state.config.dependencies);
					}
					if (state.config.views) {
						for (var view in state.config.views) {
							if (state.config.views[view].dependencies && state.config.views[view].dependencies.length) {
								dependencies = dependencies.concat(state.config.views[view].dependencies);
							}
						}
					}
					// load dependencies
					state.config.resolve = angular.extend(state.config.resolve || {}, dependencyResolverFor(dependencies));
					// any default resolve
					state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);
					// injecting layout view
					if (state.config.views && state.state.indexOf('.') === -1 && !state.config.noLayout) {
						state.config.views[''] = {
							templateUrl: 'core/uie/ui/layout/baseLayout.view.html'
						};
					}
					$stateProvider.state(state.state, state.config);
				});
				if (otherwisePath && !hasOtherwise) {
					hasOtherwise = true;
					$urlRouterProvider.otherwise(otherwisePath);
				}
			};

			function handleRoutingErrors() {
				// Route cancellation:
				// On routing error, go to the dashboard.
				// Provide an exit clause if it tries to do it twice.
				$rootScope.$on('$stateChangeError',
					function(event, toState, toParams, fromState, fromParams, error) {
						if (handlingStateChangeError) {
							return;
						}
						stateCounts.errors++;
						handlingStateChangeError = true;
						var destination = (toState &&
								(toState.title || toState.name || toState.loadedTemplateUrl)) ||
							'unknown target';
						var msg = 'Error routing to ' + destination + '. ' +
							(error.data || '') + '. <br/>' + (error.statusText || '') +
							': ' + (error.status || '');
						logger.warning(msg, [toState]);
						$location.path('/');
					}
				);
			};

			function init() {
				handleRoutingErrors();
				updateDocTitle();
			};

			function getStates() {
				return $state.get();
			};

			function updateDocTitle() {
				$rootScope.$on('$stateChangeSuccess',
					function(event, toState, toParams, fromState, fromParams) {
						stateCounts.changes++;
						handlingStateChangeError = false;
						var title = config.docTitle + ' ' + (toState.title || '');
						$rootScope.title = title; // data bind to <title>
					}
				);
			};

			function dependencyResolverFor(dependencies) {
				var definition = {
					resolver: ['$q', '$rootScope', function($q, $rootScope) {
						var deferred = $q.defer();
						require(dependencies, function() {
							$rootScope.$apply(function() {
								deferred.resolve();
							});
						});
						return deferred.promise;
					}]
				};
				return definition;
			};
		};
	};
})();