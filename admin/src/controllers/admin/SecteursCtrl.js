angular.module('pag-site')
    .controller("AdminSecteursCtrl", function(ModelSecteur, $scope) {
        $scope.deleteSect = function(id) {
            if(window.confirm('Êtes-vous sûr de supprimer ce secteur?')) {
                ModelSecteur.delete(id).then(getListSecteurs);
            }
        }

        var getListSecteurs = function() {
            ModelSecteur.list()
                .then(function(data) {
                    $scope.listSecteurs = data.data;
                    console.log('$scope.listSecteurs ', $scope.listSecteurs);
                }, function(error) {
                    console.log(error);
                });
        }
        getListSecteurs();
    })
    .controller("AdminNewSecteurCtrl", function(ModelSecteur, ModelPilier, $scope, $state) {
        $scope.secteur = {};
        $scope.saveSecteur = function() {
            ModelAxe.save($scope.secteur).then(function() {
                $state.go('admin.secteurs');
            });
        };
        $scope.pilier = {
            name: ''
        };
    })
    .controller("AdminEditSecteurCtrl", function(ModelSecteur, $rootScope, $scope, $stateParams, $state) {
        console.log('Admin edit secteur controller');

        let secteur_id = $stateParams.id;
        $scope.save = secteur_id ? 'Mettre à jour' : 'Terminer';
        $scope.sect_title = secteur_id ? 'Modifier le secteur' : 'Nouveau secteur';

        $rootScope.loading = true;
        $scope.secteur = {};

        ModelSecteur.get(secteur_id).then(function(s) {
            $scope.secteur = s.data;
            $rootScope.loading = false;
        });

        $scope.saveSecteur = function() {
            ModelSecteur.save($scope.secteur).then(function() {
                $state.go('admin.secteurs');
            });
        }
    });
