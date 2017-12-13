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
          sondage.secteur = secteur_sondage.nom;
            angular.forEach(sondage.typeReponses, function (response, j) {
              response._sondage_response = Object.keys(response)[0];
              response._sondage_score = response[response._sondage_response];
            });
        });
      }, err => {
        console.log(err);
      });

      $scope.globalObject = {};
      if($stateParams.message != undefined ){
        $scope.globalObject.message = $stateParams.message;
      }

      function getEntity (entityType, entityId) {
        return 
      }

      var getListSondages = function (){
        ModelSondage.list()
          .then(function (data){
            $scope.listSondages = data.data;
            angular.forEach($scope.listSondages, function (sondage, i) {
              sondage.secteur = 
                angular.forEach(sondage.typeReponses, function (response, j) {
                  response._sondage_response = Object.keys(response)[0];
                  response._sondage_score = response[response._sondage_response];
                });
            });
          }, function (error){
            console.log(error);
          });
      }
  })
