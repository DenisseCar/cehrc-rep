(function() {
    'use strict';

    var uie = angular
        .module('app.core.uie');

    uie
        .controller('baseTileController', baseTileController);

    baseTileController.$inject = [
        '$scope'
    ];

    function baseTileController($scope) {
        var ctrl = this;
    };

    function inputCtrl($scope) {
        //initialize variables
        console.log($scope.data);
        if (typeof($scope.data.isDisabled) == undefined) {
            $scope.data.isDisabled = false;
        }

        if (typeof($scope.data.required) == undefined) {
            $scope.data.required = false;
        }


        $scope.class = {
            isDisableClass: $scope.data.isDisabled == true ? 'disabled ' : 'enabled',
                requiredClass: typeof $scope.data.required != undefined && $scope.data.required == true ? 'required ' : 'noRequired'
        }

        $scope.data.ctrl = {
            enable: function() {
                $scope.class.isDisableClass = "enabled";
                $scope.data.isDisabled = false;
                $scope.safeApply();
            },
            disable: function() {
                $scope.class.isDisableClass = "disabled"
                $scope.data.isDisabled = true;
                $scope.safeApply();
            },
            getValue: function() {
                return $scope.data.value;
            },
            setValue: function(value) {
                $scope.data.value = value;
                $scope.safeApply();
            }
        };

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    }
})();