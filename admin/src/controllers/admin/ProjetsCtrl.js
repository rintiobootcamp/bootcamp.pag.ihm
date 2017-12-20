angular.module('pag-site')
.controller("AdminProjetsCtrl", function (ModelProjet, $scope) {
  $scope.deletePro = function(projet_id) {
    console.log('Projet delete function ', projet_id);
    ModelProjet.delete(projet_id);
  }

  var getListProjets = function () {
    ModelProjet.list()
    .then( function(data) {
      $scope.listProjets = data.data;
      console.log('$scope.listProjets ', $scope.listProjets);
    }, function (error) {
      console.log(error);
    });
  }
  getListProjets();
})
.controller("AdminNewProjetCtrl", function (ModelPilier, $scope, $stateParams) {
  let projet_id = $stateParams.id;
  $scope.save = projet_id ? 'Mettre à jour' : 'Terminer';
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
})
.controller("AdminEditProjetCtrl", function (ModelProjet, $rootScope, $scope, $stateParams) {
  console.log('Admin edit projet controller');

  let projet_id = $stateParams.id;
  $scope.save = projet_id ? 'Mettre à jour' : 'Terminer';
  $scope.proj_title = projet_id ? 'Modifier le projet' : 'Nouveau projet';
  $rootScope.loading = true;
  $scope.GetProjet = ModelProjet.get(projet_id).then(function (p) {
    let data = p.data;
    $scope.titre = data.nom;
    $scope.desc = data.description;
    $scope.dateD = data.dateDebutReel;
    $scope.dateF = data.dateFinReel;
    $scope.budget = data.budgetPrevisionnel;
    $scope.cout = data.coutReel;
    $scope.dateDp = data.dateDebutPrevisionnel;
    $scope.dateFp = data.dateFinPrevisionnel;
    $scope.reference = data.reference;
    $scope.financementPr = data.financementPublic;
    $scope.financementPu = data.financementPrive;
    $rootScope.loading = false;
  });
});
