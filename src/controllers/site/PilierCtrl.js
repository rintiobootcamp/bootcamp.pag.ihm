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
  .controller("SiteOnePilierCtrl", function(ModelPilier, ModelMedia, ModelComment, $scope,$stateParams, CONST, API, Upload,$q, ModelLike){
    
    var params_get_entity = {
        id:$stateParams.id
    }
    var params_get_comments = {
        entityId:$stateParams.id,
        entityType: 'PILIER'
    }

    $q.all([ModelPilier.list(), ModelPilier.get(params_get_entity),ModelLike.get(params_get_comments)])
        .then( values => {
            $scope.listPiliers = values[0].data;
            $scope.pilier = values[1].data;
            $scope.nbLike = values[2].data;
        });

    $scope.getImage = function (axe){
        var params = {
            entityId:axe.id,
            entityType: 'AXE'
        }
        ModelMedia.list(params)
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

    $scope.like = function (entityType,entityId,type){
        var obj = {
            likeType:type,
            entityType:entityType,
            entityId:entityId
        }
        // Logic code to verify cookie or localStorage to check customer has once voted
        // ....
        ModelLike.post(obj)
        .then( function(data){
            if(obj.likeType){
                $scope.nbLike.like++;
            }else {
                $scope.nbLike.unlike++;
            }
        }, function(error){
            console.log(error);
        });
    }

})
;
