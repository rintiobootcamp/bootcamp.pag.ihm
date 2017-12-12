angular.module('pag-site')
  .controller("SiteForumCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet) {
    $q.all([ModelSecteur.list(),ModelPilier.list(),ModelAxe.list(), ModelProjet.list()])
      .then(values => {
        $scope.listSecteurs = values[0].data;
        $scope.listPiliers = values[1].data;
        $scope.listAxes = values[2].data;
        $scope.listProjets = values[3].data;
      }, err => {
        console.log(err);
      });
  })
