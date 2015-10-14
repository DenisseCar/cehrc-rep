(function() {
    'use strict';

    var uie = angular
        .module('app.core.uie');

    uie
        .directive('baseTile', baseTile)

    function baseTile() {
        return {
            restrict: 'E',
            scope: {
                tile: '='
            },
            controller: 'baseTileController as tile',
            templateUrl: 'core/uie/ui/tile/baseTile.view.html'
        }
    };
})();