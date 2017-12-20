angular.module('pag-site')
  .controller("NavbarController", function ($scope, $state) {
    $scope.go = function(state){
      $state.go(state);
    }
  })
