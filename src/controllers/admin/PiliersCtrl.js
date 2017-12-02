angular.module('pag-site')
.controller("AdminPiliersCtrl", function (ModelPilier, $scope) {
  console.log('Admin Piliers controller');
  var getListPiliers = function () {
      ModelPilier.list()
          .then( function(data) {
              $scope.listPiliers = data.data;
          }, function (error) {
              console.log(error);
          });
  }
  getListPiliers();
})

.controller("AdminNewPiliersCtrl", function (ModelPilier, $scope, $http) {
  console.log('Admin Nouveau Piliers controller');
});
