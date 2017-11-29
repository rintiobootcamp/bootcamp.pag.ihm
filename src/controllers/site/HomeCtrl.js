angular.module('pag-site')
    .controller("SiteHomeCtrl", function (ModelProjet, ModelAxe, $scope) {
        var getCountAxes = function (){
            ModelAxe.countAxes()
                .then(function(data){
                    $scope.count_axes = data.data.count;
                }, function (error){
                    console.log(error);
                });
        }
        getCountAxes();

        var getCountProjets = function (){
            ModelProjet.countProjets()
                .then(function(data){
                    $scope.count_projets = data.data.count;
                }, function (error){
                    console.log(error);
                });
        }
        getCountProjets();
    });

