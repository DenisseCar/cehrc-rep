(function() {
    'use strict';

    var sdk = angular
        .module('app.sdk');

    sdk
        .controller('sdkController', sdkController);

    sdkController.$inject = [
        '$scope'
    ];

    function sdkController($scope) {
        $scope.listComponents = [{
            name: 'Icon Library',
            sref: 'sdk.icon'
        },  {
            name: 'Loader',
            sref: 'sdk.loader'
        }, {
            name: 'Tooltip',
            sref: 'sdk.tooltip'
        }];

        $scope.searchInput = {
            required: false,
            isDisabled: false,
            value: '',
            ctrl: {}
        }
    };
})();
