angular.module('pag-site')
    .controller("AdminProjetsCtrl", function(ModelProjet, $scope) {
        $scope.deletePro = function(projet_id) {
            console.log('Projet delete function ', projet_id);
            ModelProjet.delete(projet_id);
        }

        var getListProjets = function() {
            ModelProjet.list()
                .then(function(data) {
                    $scope.listProjets = data.data;
                    console.log('$scope.listProjets ', $scope.listProjets);
                }, function(error) {
                    console.log(error);
                });
        }
        getListProjets();
    })
    .controller("AdminNewProjetCtrl", function(ModelPilier, $scope, $stateParams) {
        $scope.saveProject = function() {
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
