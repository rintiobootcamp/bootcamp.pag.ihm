angular.module('pag-site')
    .controller("AdminProjetsCtrl", function(ModelProjet, $scope) {
        $scope.deletePro = function(id) {
            if(window.confirm('Êtes-vous sûr de supprimer ce projet?')) {
                ModelProjet.delete(id).then(getListProjets);
            }
        }

        var getListProjets = function() {
            ModelProjet.list()
                .then(function(data) {
                    $scope.listProjets = data.data;
                }, function(error) {
                });
        }
        getListProjets();
    })
    .controller("AdminNewProjetCtrl", function(ModelProjet, $scope, $stateParams, $state, Upload, API, $q) {
        $scope.saveProject = function() {
            $scope.projet.dateDebutReel = moment($scope.projet.dateDebutReel).valueOf();
            $scope.projet.dateFinReel = moment($scope.projet.dateFinReel).valueOf();
            $scope.projet.dateDebutPrevisionnel = moment($scope.projet.dateDebutPrevisionnel).valueOf();
            $scope.projet.dateFinPrevisionnel = moment($scope.projet.dateFinPrevisionnel).valueOf();
            ModelProjet.save($scope.projet).then(function(data) {
                if($scope.uploadFiles.length > 0) {
                    uploadFiles($scope.uploadFiles, data.data.id).then( function () {
                        $state.go('admin.projets');
                        }, function (error){
                            console.log(error);
                        });
                }
            });
        };

        $scope.pilier = {
            name: ''
        };

        // upload on file select or drop
        var uploadFile = function (file, idProjet) {
            return Upload.upload({
                url: API.media_fonct_url + '/PROJET/' + idProjet,
                data: {file: file}
            });
        };
        // for multiple files:
        var uploadFiles = function (files, idProjet) {
            var promises = files.map(function(file) {
                return uploadFile(file, idProjet);
            })

            return $q.all(promises);
        }
    })
    .controller("AdminEditProjetCtrl", function(ModelProjet, ModelMedia, $rootScope, $scope, $stateParams, $state, Upload, API, $q) {
        let id = $stateParams.id;
        $scope.save = id ? 'Mettre à jour' : 'Terminer';
        $scope.proj_title = id ? 'Modifier le projet' : 'Nouveau projet';
        $rootScope.loading = true;

        ModelProjet.get(id).then(function(p) {
            $scope.projet = p.data;
            $rootScope.loading = false;
        });
        $scope.medias = [];
        var params_medias = {
            entityType: "PROJET",
            entityId: id
        }
        var getListMedias = function(params) {
            ModelMedia.list(params)
                .then( function(data) {
                    $scope.medias = data.data;
                    }, function (error) {
                        console.log(error);
                });
        }
        getListMedias(params_medias);

        $scope.saveProject = function() {
            ModelProjet.save($scope.projet).then(function() {
                if($scope.uploadFiles.length > 0) {
                    uploadFiles($scope.uploadFiles, $scope.projet.id).then( function () {
                        $state.go('admin.projets');
                        }, function (error){
                            console.log(error);
                        });
                }
                
            });

            
        };

        // upload on file select or drop
        var uploadFile = function (file, idProjet) {
            return Upload.upload({
                url: API.media_fonct_url + '/PROJET/' + idProjet,
                data: {file: file}
            });
        };
        // for multiple files:
        var uploadFiles = function (files, idProjet) {
            var promises = files.map(function(file) {
                return uploadFile(file, idProjet);
            })

            return $q.all(promises);
        }
    });
