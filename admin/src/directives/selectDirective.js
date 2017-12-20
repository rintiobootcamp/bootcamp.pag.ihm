angular.module('pag-site')
  .directive("selfSelect", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.material_select();
      }
    }
  });
