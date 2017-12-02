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
  .controller("SiteOnePilierCtrl", function(ModelPilier, ModelMedia, $scope,$stateParams){
    var getListPiliers = function () {
      ModelPilier.list()
        .then( function(data) {
          $scope.listPiliers = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getListPiliers();

    var getPilier = function (id){
      ModelPilier.get(id)
        .then( function(data) {
          //console.log(data.data);
          $scope.pilier = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getPilier($stateParams.id);

    $scope.getImage = function (axe){
      ModelMedia.list(axe.id)
        .then( function(data) {
          axe.img = data.data[0].link;
        }, function (error) {
          console.log(error);
        });
      return 'https://lorempixel.com/580/250/nature/1'
    }
    getPilier($stateParams.id);
  })
;
