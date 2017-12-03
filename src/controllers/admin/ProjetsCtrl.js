angular.module('pag-site')
.controller("AdminProjetsCtrl", function (ModelProjet, $scope) {
  var getListProjets = function () {
    ModelProjet.list()
    .then( function(data) {
      $scope.listProjets = data.data;
    }, function (error) {
      console.log(error);
    });
  }
  getListProjets();
})
.controller("AdminNewProjetCtrl", function (ModelPilier, $scope) {
  console.log('Admin Nouveau projet controller');
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
