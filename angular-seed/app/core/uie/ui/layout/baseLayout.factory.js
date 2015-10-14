(function() {
    'use strict';

    var uie = angular
        .module('app.core.uie');

    uie
        .factory('baseLayoutFactory', baseLayoutFactory);

    function baseLayoutFactory() {
        var fct = {};
        return fct;
    };
})();