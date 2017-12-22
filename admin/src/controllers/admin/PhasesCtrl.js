angular.module('pag-site')
    .controller("AdminPhasesCtrl", function(ModelPhase, $scope, $stateParams) {
        let phase_id = $stateParams.id;
        $scope.save = phase_id ? 'Mettre à jour' : 'Terminer';

        $scope.deletePil = function(phase_id) {
            console.log('Secteur delete function ', phase_id);
            ModelPhase.delete(phase_id);
        }
        console.log('Admin Phases controller');
        var getListPhases = function() {
            ModelPhase.list()
                .then(function(data) {
                    $scope.listPhases = data.data;
                }, function(error) {
                    console.log(error);
                });
        }
        getListPhases();
    })

    .controller("AdminNewPhasesCtrl", function(ModelPhase, $scope, $stateParams) {
        console.log('Admin Nouveau Phases controller');
        let phase_id = $stateParams.id;
        $scope.phase_title = phase_id ? 'Modifier la phase' : 'Nouvelle phase';
        $scope.save = phase_id ? 'Mettre à jour' : 'Terminer';

    })
    .controller("AdminEditPhaseCtrl", function(ModelPhase, $rootScope, $scope, $stateParams) {
        console.log('Admin edit phase controller');

        let phase_id = $stateParams.id;
        $scope.save = phase_id ? 'Mettre à jour' : 'Terminer';
        $scope.phase_title = phase_id ? 'Modifier la phase' : 'Nouvelle phase';
        $rootScope.loading = true;
        $scope.GetPhase = ModelPhase.get(phase_id).then(function(p) {
            let data = p.data
            $scope.nom = data.nom;
            $scope.dateD = data.dateDebut;
            $scope.dateF = data.dateFin;
            $rootScope.loading = false;
        });
    })
