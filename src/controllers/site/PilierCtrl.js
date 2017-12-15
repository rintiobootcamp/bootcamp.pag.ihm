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

    $q.all([ModelPilier.list(), ModelPilier.get(params_get_entity)])
        .then( values => {
            $scope.listPiliers = values[0].data;
            $scope.pilier = values[1].data;
        });

    var getLikeEntity =  function () {
        ModelLike.get(params_get_comments)
        .then(function (data) {
            $scope.nbLike = data.data;
        });
    }
    getLikeEntity();
    

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
                getMediaComment();
            }, function (error) {
                console.log(error);
            });
    }
    getListComments(params_get_comments);

    var getMediaComment = function (){
        ModelMedia.getAll()
            .then(function(data){
                var data_medias = [];
                angular.forEach($scope.listComments, function (comment, i){
                    angular.forEach(data.data, function (media, i){
                        if(media.entityType == 'COMMENTAIRE') {
                            if(media.entityId == comment.id){
                                data_medias.push(media);
                            }
                        }
                    });
                    comment.medias = data_medias;
                    data_medias = [];
                });
                console.log($scope.listComments);
            }, function (error){
                console.log(error);
            });
    }

    $scope.comment = {
        show:false,
        id:0,
        pseudo:'',
        userMail:'',
        contenu:'',
        files:[]
    }

    $scope.showComment = function (){
        $scope.comment.show = true;
    }

    $scope.postComment = function (){
        var params = {};
            params.entityType = "PILIER";
            params.entityId  = parseInt($stateParams.id);
            if($scope.comment.pseudo !='')
                params.pseudo = $scope.comment.pseudo;
            if($scope.comment.userMail !='')
                params.userMail = $scope.comment.userMail;
            params.contenu = $scope.comment.contenu;
            //console.log(params);
            ModelComment.post(params)
            .then(function(data){
                if($scope.comment.files.length > 0) {
                    uploadFiles($scope.comment.files, data.data.id);
                }else {
                    getListComments(params_get_comments);
                } 
                $scope.comment = {};
            }, function (error){
                console.log(error);
            });
    }

    // upload on file select or drop
    var uploadFile = function (file, idCommentaire) {
        Upload.upload({
            url: API.media_fonct_url + '/COMMENTAIRE/' + idCommentaire,
            data: {file: file}
        }).then(function (resp) {
        }, function (resp) {

        }, function (evt) {

        });
    };
    // for multiple files:
    var uploadFiles = function (files, idCommentaire) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
            uploadFile(files[i], idCommentaire);
        }
      }
      getListComments(params_get_comments);
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

    $scope.addCommentTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: false,
        readonly:false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media table contextmenu code'
          ],
          toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };


})
;
