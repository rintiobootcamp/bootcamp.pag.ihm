angular.module('pag-site')
    .controller("SitePiliersCtrl", function (ModelPilier, $scope) {
        var getListPiliers = function () {
            ModelPilier.list()
                .then( function(data) {
                    console.log(data);
                    $scope.listPiliers = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListPiliers();
        
    })
  .controller("SiteOnePilierCtrl", function(ModelPilier, ModelMedia, ModelComment, $scope,$stateParams, CONST, API, Upload){
    var getListPiliers = function () {
      ModelPilier.list()
        .then( function(data) {
          $scope.listPiliers = data.data;
        }, function (error) {
          console.log(error);
        });
    }
    getListPiliers();

    var params_get_entity = {
        id:$stateParams.id
    }

    var getPilier = function (params){
        ModelPilier.get(params)
            .then( function(data) {
                $scope.pilier = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    getPilier(params_get_entity);

    $scope.getImage = function (axe){
        ModelMedia.list(axe.id)
            .then( function(data) {
                if(data.data.length > 0) {
                    var img_get = _.filter(data.data, {'mediaType':'image'});
                    if(img_get.length > 0)
                        axe.img = img_get[0].lien;
                } 
            }, function (error) {
                console.log(error);
            });
            return CONST.defaultImageEntity;
    }

    var params_get_comments = {
        entityId:$stateParams.id,
        entityType: 'PILIER'
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

    $scope.comment = {
        show:false,
        id:0,
        pseudo:'',
        email:'',
        contenu:''
    }

    $scope.showComment = function (){
        $scope.comment.show = true;
    }

    $scope.postComment = function (){
        var params = {
            entityType : "PILIER",
            entityId : parseInt($stateParams.id),
            pseudo: $scope.comment.pseudo,
            userMail : $scope.comment.email,
            contenu : $scope.comment.contenu
        }
        ModelComment.post(params)
            .then(function(data){
                getListComments(params_get_comments);
                $scope.comment.show = false;

                $scope.comment.id = data.data.id;
                uploadFiles($scope.comment.files);

            }, function (error){
                console.log(error);
            });
    }

    // upload on file select or drop
    $scope.uploadFile = function (file) {
        Upload.upload({
            url: API.media_fonct_url + 'COMMENTAIRE/' + $scope.comment.id,
            data: {file: file}
        }).then(function (resp) {
            console.log(resp);
        }, function (resp) {
            console.log(resp.status);
        }, function (evt) {

        });
    };
    // for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
      }
    }

})
;
