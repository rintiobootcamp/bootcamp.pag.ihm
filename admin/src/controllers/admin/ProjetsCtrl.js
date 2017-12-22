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
    .controller("AdminNewProjetCtrl", function(ModelProjet, $scope, $stateParams, $state) {
        $scope.saveProject = function() {
            $scope.projet.dateDebutReel = moment($scope.projet.dateDebutReel).valueOf();
            $scope.projet.dateFinReel = moment($scope.projet.dateFinReel).valueOf();
            $scope.projet.dateDebutPrevisionnel = moment($scope.projet.dateDebutPrevisionnel).valueOf();
            $scope.projet.dateFinPrevisionnel = moment($scope.projet.dateFinPrevisionnel).valueOf();
            ModelProjet.save($scope.projet).then(function() {
                $state.go('admin.projets');
            });
        };

        $scope.pilier = {
            name: ''
        };
    })
    .controller("AdminEditProjetCtrl", function(ModelProjet, $rootScope, $scope, $stateParams, $state) {
        let id = $stateParams.id;
        $scope.save = id ? 'Mettre à jour' : 'Terminer';
        $scope.proj_title = id ? 'Modifier le projet' : 'Nouveau projet';
        $rootScope.loading = true;

        ModelProjet.get(id).then(function(p) {
            $scope.projet = p.data;
            $rootScope.loading = false;
        });

        $scope.saveProject = function() {
            ModelProjet.save($scope.projet).then(function() {
                $state.go('admin.projets');
            });
        };
    });
