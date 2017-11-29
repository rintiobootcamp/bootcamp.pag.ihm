angular.module('pag-site')
    .controller("SiteProjetsCtrl", function (ModelProjet, $scope) {
        var getListProjets = function () {
            ModelProjet.list()
                .then( function(data) {
                    $scope.listProjets = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListProjets();
    });

