angular.module('pag-site')
.controller("AdminSecteursCtrl", function (ModelSecteur, $scope) {
  var getListSecteurs = function () {
    ModelSecteur.list()
    .then( function(data) {
      $scope.listSecteurs = data.data;
    }, function (error) {
      console.log(error);
    });
  }
  getListSecteurs();
})
.controller("AdminNewSecteurCtrl", function (ModelPilier, $scope) {
  console.log('Admin Nouveau secteur controller');

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
