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

.controller("AdminNewAxeCtrl", function (ModelAxe, $scope) {
  console.log('Admin Nouveau axes controller');
});
