angular.module('pag-site')
  .directive("selfDropdown", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.dropdown();
      }
    }
  });
