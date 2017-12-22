angular.module('pag-site')
    .controller("AdminPiliersCtrl", function(ModelPilier, $scope, $stateParams) {
        let pilier_id = $stateParams.id;
        $scope.save = pilier_id ? 'Mettre à jour' : 'Terminer';

        $scope.deletePil = function(pilier_id) {
            console.log('Secteur delete function ', pilier_id);
            ModelPilier.delete(pilier_id);
        }
        console.log('Admin Piliers controller');
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
