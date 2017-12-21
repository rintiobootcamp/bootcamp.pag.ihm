angular.module('pag-site')
  .controller("SiteSondageAddCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, $state, ModelSondage) {
    $q.all([ModelPilier.list(),ModelAxe.list(),ModelSecteur.list(), ModelProjet.list()])
      .then(values => {
        //$scope.listSecteurs = values[0].data;
        //$scope.listPiliers = values[1].data;
        //$scope.listAxes = values[2].data;
        //$scope.listProjets = values[3].data;

        // Make list 
        $scope.listCats = [];
        function doForeach(object) {
          angular.forEach(object, function(value1, key1){
            angular.forEach(value1.data, function(value, key){
              switch(key1) {
                case 0 : var type = 'Piliers';
                          var entityType = 'PILIER';
                  break;
                case 1 : var type = 'Axes';
                        var entityType = 'AXE';
                  break;
                case 2 : var type = 'Secteurs';
                          var entityType = 'SECTEUR';
                  break;
                case 3 : var type = 'Projets';
                        var entityType = 'PROJET';
                  break;
                default: var type = 'Projets';
                        var entityType = 'PILIER';
                  break;
              }
              $scope.listCats.push({entityType:entityType,entityId:value.id,nom:value.nom,type:type});
            });
          });
        }
        doForeach(values);
      }, err => {
        console.log(err);
      });

      $scope.listResponse = [];

      $scope.sondage = {};

      $scope.addResponse = function (){
        if($scope.sondage.response != ''){
          if($scope.listResponse.indexOf($scope.sondage.response) == -1) {
            $scope.listResponse.push($scope.sondage.response);
            $scope.sondage.response = '';
          }
        }
      }

      $scope.removeResponse = function (index){
        $scope.listResponse.splice(index,1);
      }

      $scope.submit = function (){
        var typeReponses = {};
        for(var i=0 ; i < $scope.listResponse.length; i++){
          //var response = {};
          //response[$scope.listResponse[i]] = 0;
          typeReponses[$scope.listResponse[i]] = 0;
        }
        var params = {
          "entityType": $scope.sondage.categorie.entityType,
          "entityId": $scope.sondage.categorie.entityId,
          "sujet": $scope.sondage.sujet,
          "typeReponses": typeReponses
        }
        console.log(params);
        ModelSondage.create(params)
          .then(function(data){
            $state.go('sondage',{message:'Votre sondage a été crée ! '});
          }, function (error){
            console.log(error);
          });
      }
  })
