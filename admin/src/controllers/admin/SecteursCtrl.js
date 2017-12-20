angular.module('pag-site')
.controller("AdminSecteursCtrl", function (ModelSecteur, $scope) {
  $scope.deleteSect = function(secteur_id) {
    console.log('Secteur delete function ', secteur_id);
    ModelSecteur.delete(secteur_id);
  }
  var getListSecteurs = function () {
    ModelSecteur.list()
    .then( function(data) {
      $scope.listSecteurs = data.data;
      console.log('$scope.listSecteurs ', $scope.listSecteurs);
    }, function (error) {
      console.log(error);
    });
  }
  getListSecteurs();
})
.controller("AdminNewSecteurCtrl", function (ModelSecteur, ModelPilier, $scope, $stateParams) {
  console.log('Admin Nouveau secteur controller');
  let secteur_id = $stateParams.id;
  $scope.save = secteur_id ? 'Mettre à jour' : 'Terminer';
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
})
.controller("AdminEditSecteurCtrl", function (ModelSecteur, $rootScope, $scope, $stateParams) {
  console.log('Admin edit secteur controller');

  let secteur_id = $stateParams.id;
  $scope.save = secteur_id ? 'Mettre à jour' : 'Terminer';
  $scope.sect_title = secteur_id ? 'Modifier le secteur' : 'Nouveau secteur';

  $rootScope.loading = true;
  $scope.GetSecteur = ModelSecteur.get(secteur_id).then(function (s) {
    let data = s.data
    $scope.nom = data.nom;
    $scope.desc = data.description;
    $rootScope.loading = false;
  });

  // $scope.Update = function () {
  //     $rootScope.loading = true;
  //     PDService.Update($scope.RecordToEdit, $scope.firstName, $scope.lastName, $scope.age, $scope.active).then(function (d) {
  //         $scope.UpdateMessage = d;
  //         $rootScope.loading = false;
  //     });
  // };
});
