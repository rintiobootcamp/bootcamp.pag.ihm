angular.module('pag-site')
  .directive("selfTabs", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.tabs();
      }
    }
  });
