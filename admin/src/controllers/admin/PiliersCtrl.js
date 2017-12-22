angular.module('pag-site')
    .controller("AdminPiliersCtrl", function(ModelPilier, $scope, $stateParams) {
        $scope.deletePil = function(id) {
            if(window.confirm('Êtes-vous sûr de supprimer ce pilier?')) {
                ModelPilier.delete(id);
            }
        }

        var getListPiliers = function() {
            ModelPilier.list()
                .then(function(data) {
                    $scope.listPiliers = data.data;
                }, function(error) {
                    console.log(error);
                });
        }
        getListPiliers();
    })

    .controller("AdminNewPiliersCtrl", function(ModelPilier, $scope, $http, $state) {
        $scope.pilier = {};
        $scope.savePilier = function() {
            ModelPilier.save($scope.pilier).then(function() {
                $state.go('admin.piliers');
            });
        }
    })
    .controller("AdminEditPilierCtrl", function(ModelPilier, $rootScope, $scope, $stateParams, $state) {
        let id = $stateParams.id;
        $scope.save = id ? 'Mettre à jour' : 'Terminer';
        $scope.p_title = id ? 'Modifier le pilier' : 'Nouveau pilier';
        $rootScope.loading = true;
        $scope.pilier = {};

        ModelPilier.get(id).then(function(p) {
            $scope.pilier = p.data;
            $rootScope.loading = false;
        });

        $scope.savePilier = function() {
            ModelPilier.save($scope.pilier).then(function() {
                $state.go('admin.piliers');
            });
        }
    })
