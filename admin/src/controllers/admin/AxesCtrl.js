angular.module('pag-site')
    .controller("AdminAxesCtrl", function(ModelAxe, $scope, $stateParams) {
        $scope.deleteAxe = function(id) {
            if(window.confirm('Êtes-vous sûr de supprimer cet axe?')) {
                ModelAxe.delete(id).then(getListAxes);
            }
        }

        var getListAxes = function() {
            ModelAxe.list()
                .then(function(data) {
                    $scope.listAxes = data.data;
                });
        }
        getListAxes();
    })

    .controller("AdminNewAxeCtrl", function(ModelAxe, ModelPilier, $scope, $http, $state) {
        $scope.axe = {};
        $scope.saveAxe = function() {
            ModelAxe.save($scope.axe).then(function() {
                $state.go('admin.axes');
            });
        }
    })
    .controller("AdminEditAxeCtrl", function(ModelAxe, $rootScope, $scope, $stateParams, $state) {
        let id = $stateParams.id;
        $scope.save = id ? 'Mettre à jour' : 'Terminer';
        $scope.axe_title = id ? "Modifier l'axe " : 'Nouvel axe';
        $rootScope.loading = true;
        $scope.axe = {};

        ModelAxe.get(id).then(function(s) {
            $scope.axe = s.data
            $rootScope.loading = false;
        });

        $scope.saveAxe = function() {
            ModelAxe.save($scope.axe).then(function() {
                $state.go('admin.axes');
            });
        }
    });
