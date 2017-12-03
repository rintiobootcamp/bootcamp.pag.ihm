angular.module('pag-site')
  .directive("selfCollapse", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.collapsible();
      }
    }
  });
