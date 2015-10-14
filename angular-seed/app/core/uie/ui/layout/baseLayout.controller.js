(function() {
    'use strict';

    var uie = angular
        .module('app.core.uie');

    uie
        .controller('baseLayoutController', baseLayoutController);

    baseLayoutController.$inject = [
        'baseLayoutFactory'
    ];

    function baseLayoutController(baseLayoutFactory) {
        var ctrl = this;
        var setExpanded = function(expanded) {
            ctrl.expanded = expanded;
        };
        var toggleExpand = function() {
            ctrl.expanded = !ctrl.expanded;
        };
        var toggleSidebar = function() {
            ctrl.sidebarOverlay = !ctrl.sidebarOverlay;
        };
        var changeMenuName = function(name){
            ctrl.menuName = menu;
        }
        ctrl.toggleExpand = toggleExpand;
        ctrl.toggleSidebar = toggleSidebar;
        ctrl.menuName = 'Menu'
        // setting methods in the baseLayoutFactory for the current instance
        // of baseLayout
        baseLayoutFactory.setExpanded = setExpanded;
        baseLayoutFactory.toggleExpand = toggleExpand;
        baseLayoutFactory.toggleSidebar = toggleSidebar;
        baseLayoutFactory.setMenuName = changeMenuName;
    };
})();
