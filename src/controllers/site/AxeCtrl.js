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
    .controller("SiteOneAxeCtrl", function(ModelAxe, ModelMedia, ModelComment, $scope,$stateParams,$q, ModelLike, API, Upload, cookieModel, toaster, ModelNote){

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

        var getNoteEntity =  function () {
            ModelNote.get(params_get_comments)
            .then(function (data) {
                $scope.noteEntity = data.data;
                $scope.noteEntity.total = $scope.noteEntity.noteFiveCounts
                 + $scope.noteEntity.noteFourCounts + $scope.noteEntity.noteOneCounts
                 + $scope.noteEntity.noteThreeCounts + $scope.noteEntity.noteTwoCounts;
                $scope.noteEntity.notes = {};
                $scope.noteEntity.notes[1] = $scope.noteEntity.noteOneCounts;
                $scope.noteEntity.notes[2] = $scope.noteEntity.noteTwoCounts;
                $scope.noteEntity.notes[3] = $scope.noteEntity.noteThreeCounts;
                $scope.noteEntity.notes[4] = $scope.noteEntity.noteFourCounts;
                $scope.noteEntity.notes[5] = $scope.noteEntity.noteFiveCounts;
            });
        }
        getNoteEntity();

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
        if(cookieModel.getUser().pseudo != '') {
            $scope.comment.pseudo = cookieModel.getUser().pseudo;
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

                // Save Pseudo if user choose once
                if($scope.comment.pseudo !=''){
                    cookieModel.setUser('pseudo',$scope.comment.pseudo);
                }
                // Save userMail if user choose once
                if($scope.comment.userMail !=''){
                    cookieModel.setUser('email',$scope.comment.userMail);
                }
                // Check double action and Save to cookie
                var checkCookie = cookieModel.getAxe();
                if(checkCookie.comment.indexOf(params.entityId) === -1){
                    var setCookie = cookieModel.setAxe('comment',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    }
               /*  ModelComment.post(params)
                .then(function(data){
                    var setCookie = cookieModel.setAxe('comment',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    }
                    if($scope.comment.files.length > 0) {
                        uploadFiles($scope.comment.files, data.data.id);
                    }else {
                        getListComments(params_get_comments);
                    }
                    $scope.comment = {};
                }, function (error){
                    console.log(error);
                }); */
            }else {
                console.log('Vous avez déjà commenté');
                toogleToaster('error','Alerte',"Vous avez déjà commenté");
            }
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
            var params = {
                likeType:type,
                entityType:entityType,
                entityId:parseInt(entityId)
            }
            console.log(params);
            // Logic code to verify cookie or localStorage to check customer has once voted
            // Check double action and Save to cookie
            var checkCookie = cookieModel.getAxe();
            if(checkCookie.like.indexOf(params.entityId) === -1){
                var setCookie = cookieModel.setAxe('like',params.entityId);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                }
                /* ModelLike.post(params)
                .then( function(data){
                    if(params.likeType){
                        $scope.nbLike.like++;
                    }else {
                        $scope.nbLike.unlike++;
                    }
                    var setCookie = cookieModel.setAxe('like',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    }
                }, function(error){
                    console.log(error);
                }); */
            }else {
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

        $scope.getReadMoreState = false;
        $scope.readMore = function (){
            if($scope.getReadMoreState) {
                $scope.getReadMoreState = false;
            }
            else $scope.getReadMoreState = true;
        }

        var toogleToaster = function (type,title, body){
            toaster.pop({
                 type: type,
                 title: title,
                 body: body,
                 showCloseButton: true
            })
        }

        $scope.noteList = [
            { indice: 1, noteType:'noteOneCounts'},
            { indice: 2, noteType:'noteTwoCounts'},
            { indice: 3, noteType:'noteThreeCounts'},
            { indice: 4, noteType:'noteFourCounts'},
            { indice: 5, noteType:'noteFiveCounts'},
        ];

        $scope.doNote = function (noteId){
            var params = {
                entityType:'AXE',
                entityId:$stateParams.id,
                noteType:parseInt(noteId)
            }

            // Check double action and Save to cookie
            var checkCookie = cookieModel.getAxe();
            if(checkCookie.note.indexOf(params.entityId) === -1){
                var setCookie = cookieModel.setAxe('note',params.entityId);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                }

               /*  ModelNote.note(params)
                    .then( function (data){
                        getNoteEntity();
                        var setCookie = cookieModel.setAxe('note',params.entityId);
                        if(setCookie.STATUS === 300) {
                            toogleToaster('error','Alerte',setCookie.STATUS.message);
                        }

                    }, function (error){

                    }); */
                }else{
                    toogleToaster('error','Alerte',"Vous avez déjà noté ");
                }
        }
    })
;
