angular.module('pag-site')
  .directive("selfModal", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.modal();
      }
    }
  });
