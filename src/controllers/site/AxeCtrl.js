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
    .controller("SiteOneAxeCtrl", function(ModelAxe, ModelMedia, ModelComment, $scope,$stateParams,$q, ModelLike, API, Upload){

        var params_get_entity = {
            id:$stateParams.id
        }

        var params_get_comments = {
            entityId:$stateParams.id,
            entityType: 'AXE'
        }

        $q.all([ModelAxe.list(), ModelAxe.get(params_get_entity)])
        .then( values => {
            $scope.listAxes = values[0].data;
            $scope.axe = values[1].data;
        });
        var getLikeEntity =  function () {
            ModelLike.get(params_get_comments)
            .then(function (data) {
                $scope.nbLike = data.data;
            });
        }
        getLikeEntity();

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
                params.entityType = "AXE";
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
                console.log(resp.data);
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

        $scope.getReadMoreState = false;
        $scope.readMore = function (){
            if($scope.getReadMoreState) {
                $scope.getReadMoreState = false;
            }
            else $scope.getReadMoreState = true;
        }
    })
;
