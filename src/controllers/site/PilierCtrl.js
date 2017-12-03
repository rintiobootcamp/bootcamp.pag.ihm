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
    .controller("SiteOnePilierCtrl", function(ModelPilier, ModelMedia, ModelComment, CONST, $scope,$stateParams){
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

    $scope.getImage = function (axe){
        ModelMedia.list(axe.id)
            .then( function(data) {
                axe.img = data.data[0].link;
            }, function (error) {
                console.log(error);
            });
            return CONST.defaultImageEntity;
    }

    var getListComments = function (params) {
        ModelComment.list(params)
            .then( function(data) {
                $scope.listComments = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    getListComments({entityId:$stateParams.id,entityType: 'PILIER'});

    })
;
