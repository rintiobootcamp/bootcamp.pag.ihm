angular.module('pag-site')
    .controller("SiteAxesCtrl", function (ModelAxe, ModelPilier, $scope) {
        var getListAxes = function () {
            ModelPilier.list()
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

        var params_get_entity = {
            id:$stateParams.id
        }

        var getAxe = function (params){
            ModelAxe.get(params)
                .then( function(data) {
                    console.log(data);
                    $scope.axe = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getAxe(params_get_entity);

        $scope.getImage = function (axe){
            ModelMedia.list(axe.id)
                .then( function(data) {
                    axe.img = data.data[0].link;
                }, function (error) {
                    console.log(error);
                });
                return CONST.defaultImageEntity;
        }

        var params_get_comments = {
            entityId:$stateParams.id,
            entityType: 'AXE'
        }

        var getListComments = function (params) {
            ModelComment.list(params)
                .then( function(data) {
                    $scope.listComments = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListComments(params_get_comments);
    })
;
