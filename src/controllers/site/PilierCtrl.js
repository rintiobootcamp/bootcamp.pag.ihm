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
  .controller("SiteOnePilierCtrl", function($sce, ModelPilier, ModelMedia, ModelComment, $scope,$stateParams, CONST, API, Upload,$q, ModelLike, cookieModel, toaster, ModelNote){
    
    var params_get_entity = {
        entityId:$stateParams.id
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
                    angular.forEach(comment.medias, function (media, i){
                        if(media.type.indexOf('audio') != -1 || media.type.indexOf('video') != -1) {
                          comment.medias[i].vgsrc = [];
                          var obj = {
                            src: $sce.trustAsResourceUrl(media.lien),
                            type: media.type
                          }
                          comment.medias[i].vgsrc.push(obj);
                          /* var obj = {
                            src: $sce.trustAsResourceUrl("http://localhost:8080/assets/test.mp3"),
                            type: "audio/mpeg"
                          }
                          var obj2 = {
                            src: $sce.trustAsResourceUrl("http://localhost:8080/assets/test_video.mp4"),
                            type: "video/mp4"
                          }
                          if(i < 2) {
                            comment.medias[i].type = "audio/mpeg";
                            comment.medias[i].vgsrc.push(obj);
                          }
                          else {
                            comment.medias[i].type = "video/mp4";
                            comment.medias[i].vgsrc.push(obj2);
                          } */
                        }
                      });
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
    if(cookieModel.getUser().pseudo != '') {
        $scope.comment.pseudo = cookieModel.getUser().pseudo;
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

             // Save Pseudo if user choose once
            if($scope.comment.pseudo !=''){
                cookieModel.setUser('pseudo',$scope.comment.pseudo);
            }
            // Save userMail if user choose once
            if($scope.comment.userMail !=''){
                cookieModel.setUser('email',$scope.comment.userMail);
            }
            // Check double action and Save to cookie
            /* var checkCookie = cookieModel.getPilier();
            if(checkCookie.comment.indexOf(params.entityId) === -1){ */
                /* var setCookie = cookieModel.setPilier('comment',params.entityId);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                } */
                ModelComment.post(params)
                .then(function(data){
                    var setCookie = cookieModel.setPilier('comment',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    }
                    if($scope.comment.files.length > 0) {
                        uploadFiles($scope.comment.files, data.data.id);
                    }else {
                        getListComments(params_get_comments);
                    }
                    $scope.comment = {};
                    $scope.comment.files = [];
                }, function (error){
                    console.log(error);
                });
            /* }else {
                toogleToaster('error','Alerte',"Vous avez déjà commenté ");
            } */
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
        if($scope.waiting) return;
        else $scope.waiting = true;
        var params = {
            likeType:type,
            entityType:entityType,
            entityId:parseInt(entityId)
        }
        // Logic code to verify cookie or localStorage to check customer has once voted
        // Check double action and Save to cookie
        var checkCookie = cookieModel.getPilier();
        if(checkCookie.like.indexOf(params.entityId) === -1){
            /* var setCookie = cookieModel.setPilier('like',params.entityId);
            if(setCookie.STATUS === 300) {
                toogleToaster('error','Alerte',setCookie.STATUS.message);
            } */
            ModelLike.post(params)
            .then( function(data){
                $scope.waiting = false;
                if(params.likeType){
                    $scope.nbLike.like++;
                }else {
                    $scope.nbLike.unlike++;
                }
                var setCookie = cookieModel.setPilier('like',params.entityId);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                }
            }, function(error){
                $scope.waiting = false;
                console.log(error);
            });
        }else {
            $scope.waiting = false;
            toogleToaster('error','Alerte',"Vous avez déjà liké ");
        }
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

    var toogleToaster = function (type,title, body){
        toaster.pop({
             type: type,
             title: title,
             body: body,
             showCloseButton: true
        })
    }

    $scope.noteList = [
        { indice: 1, noteType:'UN'},
        { indice: 2, noteType:'DEUX'},
        { indice: 3, noteType:'TROIS'},
        { indice: 4, noteType:'QUATRE'},
        { indice: 5, noteType:'CINQ'},
    ];

    $scope.waiting = false;
    $scope.doNote = function (noteType){
        if($scope.waiting) return;
        else $scope.waiting = true;
        $scope.waiting = true;
        var params = {
            entityType:'PILIER',
            entityId:$stateParams.id,
            noteType:noteType
        }

        // Check double action and Save to cookie
        var checkCookie = cookieModel.getPilier();
        if(checkCookie.note.indexOf(params.entityId) === -1){
            /* var setCookie = cookieModel.setPilier('note',params.entityId);
            if(setCookie.STATUS === 300) {
                toogleToaster('error','Alerte',setCookie.STATUS.message);
            } */

            ModelNote.note(params)
                .then( function (data){
                    $scope.waiting = false;
                    getNoteEntity();
                    var setCookie = cookieModel.setPilier('note',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    }

                }, function (error){
                    $scope.waiting = false;
                });
            }else{
                $scope.waiting = false;
                toogleToaster('error','Alerte',"Vous avez déjà noté ");
            }
    }

    var getNoteEntity =  function () {
        ModelNote.get(params_get_comments)
        .then(function (data) {
            $scope.noteEntity = data.data;
            $scope.noteEntity.notes = [];
            $scope.noteEntity.notes.push({i: 1,value: $scope.noteEntity.noteOneCounts});
            $scope.noteEntity.notes.push({i: 2,value: $scope.noteEntity.noteTwoCounts});
            $scope.noteEntity.notes.push({i: 3,value: $scope.noteEntity.noteThreeCounts});
            $scope.noteEntity.notes.push({i: 4,value: $scope.noteEntity.noteFourCounts});
            $scope.noteEntity.notes.push({i: 5,value: $scope.noteEntity.noteFiveCounts});

            console.log($scope.noteEntity);
        });
    }
    getNoteEntity();


})
;
