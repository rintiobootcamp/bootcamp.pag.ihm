angular.module('pag-site')
  .controller("SiteSondageCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, ModelSondage, $stateParams) {
    $q.all([ModelSecteur.list(),ModelPilier.list(),ModelAxe.list(), ModelProjet.list(), ModelSondage.list()])
      .then(values => {
        $scope.listSecteurs = values[0].data;
        $scope.listPiliers = values[1].data;
        $scope.listAxes = values[2].data;
        $scope.listProjets = values[3].data;

        $scope.listSondages = values[4].data;
        angular.forEach($scope.listSondages, function (sondage, i) {
          var secteur_sondage = '';
          switch (sondage.entityType) {
            case 'PILIER':
              secteur_sondage = _.filter($scope.listPiliers,{'id':sondage.entityId})[0];
              break;
            case 'AXE':
              secteur_sondage = _.filter($scope.listAxes,{'id':sondage.entityId})[0];
            break;
            case 'SECTEUR':
              secteur_sondage = _.filter($scope.listSecteurs,{'id':sondage.entityId})[0];
            break;
            case 'PROJET':
              secteur_sondage = _.filter($scope.listProjets,{'id':parseInt(sondage.entityId)})[0];
            break;
          
            default:
              break;
          }
          if(secteur_sondage != undefined )
            sondage.secteur = secteur_sondage.nom;
          else sondage.secteur = 'Non défini';
        });
      }, err => {
        console.log(err);
      });

      $scope.globalObject = {};
      if($stateParams.message != undefined ){
        $scope.globalObject.message = $stateParams.message;
      }

      var getListSondages = function (){
        ModelSondage.list()
          .then(function (data){
            $scope.listSondages = data.data;
          }, function (error){
            console.log(error);
          });
      }

      $scope.participe = function (vote, id){
        var params = {
          id: id,
          voted : vote
        }
        console.log(params)
        ModelSondage.vote(params)
          .then( function (data) {
            var get_sondage_server = data.data;
            var get_sondage = _.filter($scope.listSondages,{'id':get_sondage_server.id})[0];
            get_sondage.typeReponses = {};
            angular.forEach( get_sondage_server.typeReponses, function (value, i){
              get_sondage.typeReponses[i] = value;
            });
          }, function (error){
            console.log(error);
          });
      }
  })
