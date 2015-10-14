(function() {
	var uie = angular
		.module('app.core.uie');

	uie
		.factory('baseUtil', baseUtil);

	function baseUtil() {
		var util = {};
		return util;
	};
})();