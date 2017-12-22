angular.module('pag-site')
  .controller("SiteSondageCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, ModelSondage, $stateParams, cookieModel, toaster) {
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
        $scope.globalListSondages = $scope.listSondages;
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
      $scope.waiting = false;
      $scope.participe = function (key, sondage){
        if($scope.waiting) return;
        else $scope.waiting = true;
        var checkCookie = cookieModel.getSondage();
          if(checkCookie.vote.indexOf(sondage.id) === -1){
            ModelSondage.vote(key, sondage.id)
              .then( function (data) {
                sondage.typeReponses[key]++;
                $scope.waiting = false;
                var setCookie = cookieModel.setSondage('vote',sondage.id);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                }
                var get_sondage_server = data.data;
                var get_sondage = _.filter($scope.listSondages,{'id':get_sondage_server.id})[0];
                get_sondage.typeReponses = {};
                angular.forEach( get_sondage_server.typeReponses, function (value, i){
                  get_sondage.typeReponses[i] = value;
                });
              }, function (error){
                toogleToaster('error','Alerte',"Le serveur rencontre des difficultés actuellement! Veuillez réessayer plus tard ! ");
                $scope.waiting = false;
                console.log(error);
              });
          }else {
            $scope.waiting = false;
            toogleToaster('error','Alerte',"Vous avez déjà commenté ");
        }
      }

      $scope.filter = function (type, id){
        $scope.listSondages = _.filter($scope.globalListSondages,{'entityId':parseInt(id),'entityType':type});
      }

      var toogleToaster = function (type,title, body){
        toaster.pop({
             type: type,
             title: title,
             body: body,
             showCloseButton: true
        })
    }
  })
