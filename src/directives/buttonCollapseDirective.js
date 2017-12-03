angular.module('pag-site')
  .directive("selfButtonCollapse", function () {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.sideNav();
      }
    }
  })

  .directive('selfButtonCollapseClose', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            element.on('click', function (){
              element.sideNav('hide');
            });
        }
    };
})
;
  
