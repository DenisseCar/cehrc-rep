(function() {
    'use strict';

    var tsk = angular
        .module('app.tsk');

    tsk
        .controller('tskController', tskController);

    tskController.$inject = [
        '$http',
        'baseLayoutFactory',
        'tskAPI'
    ];

    function tskController($http, baseLayoutFactory, tskAPI) {
        baseLayoutFactory.setExpanded(true);
        var ctrl = this;
        ctrl.working = true;
        $http.get(tskAPI.endpoints.app.list)
            .success(function(data, status, headers, config) {
                // console.log(data, status, headers, config);
                ctrl.apps = data;
                ctrl.working = false;
            })
            .error(function(data, status, headers, config) {
                // console.log(data)
                ctrl.working = false;
            });
    };
})();