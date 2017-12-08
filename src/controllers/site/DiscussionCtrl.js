angular.module('pag-site')
  .controller("SiteDiscussionCtrl", function ($scope, $state) {
    $scope.go = function(state){
      $state.go(state);
    }
  })
