angular.module('pag-site')
    .controller("SiteProjetsCtrl", function (ModelProjet, $scope) {
        var getListProjets = function () {
            ModelProjet.list()
                .then( function(data) {
                    $scope.listProjets = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListProjets();
    })
    .controller("SiteOneProjetCtrl", function(ModelProjet, ModelComment, $scope,$stateParams){
        var getListProjetsBySeceteur = function (idProjet) {
            ModelProjet.listBySecteur(idProjet)
                .then( function(data) {
                    $scope.listProjetsSecteur = data.data;
                }, function (error) {
                    console.log(error);
                });
        }

        var getProjet = function (id){
            ModelProjet.get(id)
                .then( function(data) {
                    $scope.projet = data.data;
                    getListProjetsBySeceteur(projet.id);
                }, function (error) {
                    console.log(error);
                });
        }
        getProjet($stateParams.id);

        var getListComments = function (params) {
            ModelComment.list(params)
                .then( function(data) {
                    $scope.listComments = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListComments({entityId:$stateParams.id,entityType: 'PROJET'});
    })
    ;

