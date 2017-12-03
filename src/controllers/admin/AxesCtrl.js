angular.module('pag-site')
.controller("AdminAxesCtrl", function (ModelAxe, $scope) {
  console.log('admin ax ctrl');
  var getListAxes = function () {
    ModelAxe.list()
    .then( function(data) {
      console.log('data ', data);
      $scope.listAxes = data.data;
      console.log('$scope.listAxes ', $scope.listAxes);
    }, function (error) {
      console.log(error);
    });
  }
  getListAxes();
})

.controller("AdminNewAxeCtrl", function (ModelAxe, ModelPilier, $scope) {
  console.log('Admin Nouveau axes controller');
  var getListPiliers = function () {
    ModelPilier.list()
    .then( function(data) {
      $scope.listPiliers = data.data;
    }, function (error) {
      console.log(error);
    });
  }
  getListPiliers();

  $scope.pilier = {name: ''};
});
