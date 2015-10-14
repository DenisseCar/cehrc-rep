(function() {
	'use strict';

	var sdk = angular
		.module('app.sdk');

	sdk
		.controller('iconController', iconController);

	iconController.$inject = [
		'$timeout',
		'$http',
		'coreAPI'
	]

	function iconController($timeout, $http, coreAPI) {
		var ctrl = this;
		ctrl.working = true;
		$timeout(function() {
			$http.get(coreAPI.endpoints.icon.list)
				.success(function(data, status, headers, config) {
					// console.log(data, status, headers, config);
					ctrl.icons = data;
					ctrl.working = false;
				})
				.error(function(data, status, headers, config) {
					// console.log(data)
					ctrl.working = false;
				});
		}, 1000);
	};
})();