(function() {
	'use strict';

	var sdk = angular
		.module('app.sdk');

	sdk
		.controller('tooltipController', tooltipController);

	function tooltipController() {
		var ctrl = this;
		var positionTooltips = [{
			text: 'text',
			position: 'top'
		}, {
			text: 'text',
			position: 'bottom'
		}, {
			text: 'text',
			position: 'left'
		}, {
			text: 'text',
			position: 'right'
		}];
		var sizeTooltips = [{
			text: 'text',
			size: 'small'
		}, {
			text: 'text',
			size: 'medium'
		}, {
			text: 'text',
			size: 'large'
		}];
		var speedTooltips = [{
			text: 'text',
			speed: 'fast'
		}, {
			text: 'text',
			speed: 'medium'
		}, {
			text: 'text',
			speed: 'slow'
		}, {
			text: 'text',
			speed: '1000'
		}, {
			text: 'text',
			speed: '5000'
		}];
		ctrl.closeButton = {
			text: 'close'
		};
		ctrl.positionTooltips = positionTooltips;
		ctrl.sizeTooltips = sizeTooltips;
		ctrl.speedTooltips = speedTooltips;
	};
})();