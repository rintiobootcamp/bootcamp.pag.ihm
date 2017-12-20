angular.module('pag-site')
.controller("AdminPiliersCtrl", function (ModelPilier, $scope, $stateParams) {
  let pilier_id = $stateParams.id;
  $scope.save = pilier_id ? 'Mettre à jour' : 'Terminer';

  $scope.deletePil = function(pilier_id) {
    console.log('Secteur delete function ', pilier_id);
    ModelPilier.delete(pilier_id);
  }
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
})
.controller("AdminEditPilierCtrl", function (ModelPilier, $rootScope, $scope, $stateParams) {
  console.log('Admin edit pilier controller');

  let pilier_id = $stateParams.id;
  $scope.save = pilier_id ? 'Mettre à jour' : 'Terminer';
  $scope.p_title = pilier_id ? 'Modifier le pilier' : 'Nouveau pilier';
  $rootScope.loading = true;
  $scope.GetSecteur = ModelPilier.get(pilier_id).then(function (p) {
    let data = p.data
    $scope.nom = data.nom;
    $scope.desc = data.description;
    $scope.dateM = data.dateMiseAJour;
    $rootScope.loading = false;
  });
})
