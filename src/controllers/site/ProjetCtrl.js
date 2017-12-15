angular.module('pag-site')
    .controller("SiteProjetsCtrl", function (ModelProjet, ModelSecteur, $scope, $q, ModelPilier, ModelAxe, CONST) {
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

        $scope.limitImgProjet = CONST.limitImgProjet;
        
        var getListPiliers = function (){
            ModelPilier.list()
                .then(function (data){
                    $scope.listPiliers = data.data;
                }, function (error){

                });
        }
        getListPiliers();

        var getListAxes = function (){
            ModelAxe.list()
                .then(function (data){
                    $scope.listAxes = data.data;
                }, function (error){

                });
        }
        getListAxes();
    })
    .controller("SiteOneProjetCtrl", function(ModelProjet, ModelSecteur, ModelComment, ModelMedia, $scope,$stateParams, $q, ModelLike){
        var params_get_entity = {
            id:$stateParams.id
        }

        var params_get_comments = {
            entityId:$stateParams.id,
            entityType: 'PROJET'
        }

        var getListComments = function (params) {
            ModelComment.list(params)
                .then( function(data) {
                    $scope.listComments = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListComments(params_get_comments);

        $q.all([ModelSecteur.list(),ModelProjet.get(params_get_entity),ModelProjet.list()])//, ModelProjet.get(params_get_entity)])
        .then(values => {
            // Liste de tous les secteurs
            $scope.listProjetsSecteur = values[0].data;
            // Liste de tous les projets
            $scope.listProjets = values[2].data;
            // Récupérer un projet
            $scope.projet = values[1].data;
            // Ajouter les infos du secteur au projet récupéré
            $scope.projet.secteur = _.filter($scope.listProjetsSecteur,{'id':$scope.projet.idSecteur})[0];
            
            // Liste des autres projets dans le même secteur
            $scope.listOtherProjetsSecteur = _.filter($scope.listProjets, {'idSecteur':parseInt($scope.projet.idSecteur)});
        },err => {
          console.log(err);
        });

        var getLikeEntity =  function () {
            ModelLike.get(params_get_comments)
            .then(function (data) {
                $scope.nbLike = data.data;
            });
        }
        getLikeEntity();

        var getListMediasEntity =  function () {
            ModelMedia.list(params_get_comments)
            .then(function (data) {
                // Liste des médias du projet
                var medias_projets = data.data;
                // Récupération du fichier de synthèse du PAG
                $scope.get_synthese_file = _.filter(medias_projets,{'mediaType':'document','nom':'fiche-projet'})[0];
            });
        }
        getListMediasEntity();

        

        $scope.like = function (entityType,entityId,type){
            var obj = {
                likeType:type,
                entityType:entityType,
                entityId:entityId
            }
            // Logic code to verify cookie or localStorage to check customer has once voted
            // ....
            ModelLike.post(obj)
            .then( function(data){
                if(obj.likeType){
                    $scope.nbLike.like++;
                }else {
                    $scope.nbLike.unlike++;
                }
            }, function(error){
                console.log(error);
            });
        }
    })
    ;

