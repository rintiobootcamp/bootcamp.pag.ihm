angular.module('pag-site')
    .controller("SiteAxesCtrl", function (ModelAxe, $scope) {
        var getListAxes = function () {
            ModelAxe.list()
                .then( function(data) {
                    $scope.listPiliers = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListAxes();
        
    })
    ;

