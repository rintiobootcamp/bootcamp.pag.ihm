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
    .controller("SiteOneAxeCtrl", function(ModelAxe, ModelMedia, ModelComment, $scope,$stateParams){
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
                    $scope.axe = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getAxe($stateParams.id);

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
        getListComments({entityId:$stateParams.id,entityType: 'AXE'});
    })
;
