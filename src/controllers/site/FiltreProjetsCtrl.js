angular.module('pag-site')
  .controller("SiteFiltreProjetsCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, ModelSondage, $stateParams) {
    
    $q.all([ModelProjet.list(), ModelSecteur.list()])
      .then( values => {
        $scope.listProjets = values[0].data;
        $scope.listSecteurs = values[1].data;
        angular.forEach($scope.listProjets, function (value, i){
          var get_secteur = _.filter($scope.listSecteurs, {'id':value.idSecteur})[0];
          value.secteur = get_secteur;
        });
        $scope.globalListProjets = $scope.listProjets;
        $scope.table.isSearching = false;
      }, error => {
        console.log(error);
      });
     
    $scope.table = {};
    $scope.table.isSearching = true;

    $scope.filter = {};
    $scope.filter.secteurs = [];

    $scope.filter = function (){
      if($scope.filter.secteurs.length > 0 ){
        var id_secteurs = _.map($scope.filter.secteurs, 'id');
        $scope.listProjets = _.filter($scope.globalListProjets, (p) => _.includes(id_secteurs, p.idSecteur));
      }
    }

    $scope.resetFilter = function (){
      $scope.filter = {};
      $scope.filter.secteurs = [];
      $scope.listProjets = $scope.globalListProjets;
    }


    
  })
