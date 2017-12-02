angular.module('pag-site')
  .controller("SiteAxesCtrl", function (ModelAxe, $scope) {
    var getListAxes = function () {
      ModelAxe.listPiliers()
        .then( function(data) {
          $scope.listPiliers = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getListAxes();

  })
  .controller("SiteOneAxeCtrl", function(ModelAxe, $scope,$stateParams){
    var getListAxes = function () {
      ModelAxe.list()
        .then( function(data) {
          $scope.listAxes = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getListAxes();

    var getAxe = function (id){
      ModelAxe.get(id)
        .then( function(data) {
          //console.log(data.data);
          $scope.axe = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getAxe($stateParams.id);
  })
;
