angular.module('pag-site')
    .controller("AdminAxesCtrl", function(ModelAxe, $scope, $stateParams) {
        let axe_id = $stateParams.id;
        $scope.save = axe_id ? 'Mettre à jour' : 'Terminer';

        $scope.deleteAxe = function(axe_id) {
            console.log('Axe delete function ', axe_id);
            ModelAxe.delete(axe_id);
        }
        console.log('admin ax ctrl');
        var getListAxes = function() {
            ModelAxe.list()
                .then(function(data) {
                    console.log('data ', data);
                    $scope.listAxes = data.data;
                    console.log('$scope.listAxes ', $scope.listAxes);
                }, function(error) {
                    console.log(error);
                });
        }
        getListAxes();
    })

    .controller("AdminNewAxeCtrl", function(ModelAxe, ModelPilier, $scope, $http) {
        console.log('Admin Nouveau axes controller');
        var getListPiliers = function() {
            ModelPilier.list()
                .then(function(data) {
                    $scope.listPiliers = data.data;
                    console.log('$scope.listPiliers', $scope.listPiliers);
                }, function(error) {
                    console.log(error);
                });
        }
        getListPiliers();

        $scope.saveAxe = function() {
            console.log('Axe saving function called');
            ModelAxe.create($scope.axe);
        }

    })
    .controller("AdminEditAxeCtrl", function(ModelAxe, $rootScope, $scope, $stateParams, $state) {
        console.log('Admin edit axe controller');

        let axe_id = $stateParams.id;
        $scope.save = axe_id ? 'Mettre à jour' : 'Terminer';
        $scope.axe_title = axe_id ? "Modifier l'axe " : 'Nouvel axe';
        $rootScope.loading = true;
        $scope.axe = {};

        ModelAxe.get(axe_id).then(function(s) {
            $scope.axe = s.data
            $rootScope.loading = false;
        });

        $scope.saveAxe = function() {
            ModelAxe.save($scope.axe).then(function() {
                $state.go('admin.axes');
            })
        }
    });
