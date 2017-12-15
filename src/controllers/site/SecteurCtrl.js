angular.module('pag-site')
  .controller("SiteSecteursCtrl", function (ModelSecteur, ModelProjet, $scope, $q) {
    $q.all([ModelSecteur.list(),ModelProjet.list()])
      .then(values => {
        $scope.listSecteurs = values[0].data;
        $scope.listProjets = values[1].data;
        angular.forEach($scope.listSecteurs, function (value, i){
          var get_projets = _.filter($scope.listProjets, {'idSecteur':value.id});
          value.projets = get_projets;
        });
      },err => {
        console.log(err);
      });

      $scope.getreadMoreState = false;

      $scope.showProjects = function (index){
        if($scope.listSecteurs[index].getreadMoreState) {
            $scope.listSecteurs[index].getreadMoreState = false;
        }
        else $scope.listSecteurs[index].getreadMoreState = true;
    }
    
  });

