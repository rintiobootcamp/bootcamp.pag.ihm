angular.module('pag-site')
    .controller("AdminHomeCtrl", function($scope, ModelProjet, StatProjet) {
        $scope.data = [];
        ModelProjet.list().then(function(res) {
            $scope.projets = res.data;
        });

        $scope.onProjectChanged = function(id) {
            StatProjet.get('PROJET', id, '0', '0').then(function(res) {
                $scope.data = res.data;
            });
        }
    });
