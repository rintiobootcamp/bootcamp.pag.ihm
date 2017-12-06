angular.module('pag-site')
  .controller("SiteSecteursCtrl", function (ModelSecteur, ModelProjet, $scope, $q) {
    $q.all([ModelSecteur.list(),ModelProjet.list()])
      .then(values => {
        $scope.listSecteurs = values[0].data;
        $scope.listProjets = values[1].data;
        angular.forEach($scope.listSecteurs, function (value, i){
          var get_piliers = _.filter($scope.listProjets, {'idSecteur':value.id});
          value.projets = get_piliers;
        });
      },err => {
        console.log(err);
      });
    
  });

