(function() {
	'use strict';

	var sdk = angular
		.module('app.sdk');

	sdk
		.controller('loaderController', loaderController);

	function loaderController() {
		var ctrl = this;
		var loaders = [{
			working: true,
			template: 1,
			message: ''
		}, {
			working: true,
			template: 2,
			message: ''
		}, {
			working: true,
			template: 3,
			message: ''
		}, {
			working: true,
			template: 4,
			message: ''
		}, {
			working: true,
			template: 5,
			message: ''
		}, {
			working: true,
			template: 6,
			message: ''
		}, {
			working: true,
			template: 7,
			message: ''
		}, {
			working: true,
			template: 8,
			message: ''
		}, {
			working: true,
			template: 1,
			message: 'Loading...'
		}];
		ctrl.loaders = loaders;
		ctrl.toggleWorkingLoader = function(index){
			loaders[index].working = !loaders[index].working;
		};
	};
})();