angular.module('pag-site')
    .controller("SitePiliersCtrl", function (ModelPilier, $scope) {
        var getListPiliers = function () {
            ModelPilier.list()
                .then( function(data) {
                    $scope.listPiliers = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListPiliers();
        
    })
    .controller("SitePilierCtrl", function(ModelPilier, $scope) {
        var getListPiliers = function () {
            ModelPilier.get()
                .then( function(data) {
                    console.log(data.data);
                    $scope.pilier = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListPiliers();
    })
    ;

