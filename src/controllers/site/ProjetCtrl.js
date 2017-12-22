angular.module('pag-site')
    .controller("SiteProjetsCtrl", function (ModelProjet, ModelSecteur, $scope, $q, ModelPilier, ModelAxe, CONST) {
        $q.all([ModelSecteur.list(),ModelProjet.list()])
        .then(values => {
          $scope.listSecteurs = values[0].data;
          $scope.listProjets = values[1].data;
          angular.forEach($scope.listSecteurs, function (value, i){
            var get_piliers = _.filter($scope.listProjets, {'idSecteur':value.id});
            value.projets = get_piliers;
          });
        },err => {
          console.log(err);
        });

        $scope.limitImgProjet = CONST.limitImgProjet;
        
        var getListPiliers = function (){
            ModelPilier.list()
                .then(function (data){
                    $scope.listPiliers = data.data;
                }, function (error){

                });
        }
        getListPiliers();

        var getListAxes = function (){
            ModelAxe.list()
                .then(function (data){
                    $scope.listAxes = data.data;
                }, function (error){

                });
        }
        getListAxes();

        $scope.comment = {
            show:false,
            id:0,
            pseudo:'',
            userMail:'',
            contenu:''
        }
    
        $scope.showComment = function (){
            $scope.comment.show = true;
        }
    
        $scope.postComment = function (){
            var params = {};
                params.entityType = "PROJET";
                params.entityId  = parseInt($scope.projet.id);
                if($scope.comment.pseudo !='')
                    params.pseudo = $scope.comment.pseudo;
                if($scope.comment.userMail !='')
                    params.userMail = $scope.comment.userMail;
                params.contenu = $scope.comment.contenu;
                //console.log(params);
            ModelComment.post(params)
                .then(function(data){
                    $scope.comment = {};
                    getListComments(params_get_comments);
                    $scope.comment.show = false;
    
                    $scope.comment.id = data.data.id;
                    //uploadFiles($scope.comment.files);
    
                }, function (error){
                    console.log(error);
                });
        }
    })
    .controller("SiteOneProjetCtrl", function($sce, ModelProjet, ModelSecteur, ModelComment, ModelMedia, $scope,$stateParams, $q, ModelLike, Upload, API, cookieModel, toaster, ModelNote){
        var params_get_entity = {
            entityId:$stateParams.id
        }

        var params_get_comments = {
            entityId:$stateParams.id,
            entityType: 'PROJET'
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
                            }
                          });
                        data_medias = [];
                    });
                    console.log($scope.listComments);
                }, function (error){
                    console.log(error);
                });
        }

        $q.all([ModelSecteur.list(),ModelProjet.get(params_get_entity),ModelProjet.list()])//, ModelProjet.get(params_get_entity)])
        .then(values => {
            // Liste de tous les secteurs
            $scope.listProjetsSecteur = values[0].data;
            // Liste de tous les projets
            $scope.listProjets = values[2].data;
            // Récupérer un projet
            $scope.projet = values[1].data;
            // Ajouter les infos du secteur au projet récupéré
            $scope.projet.secteur = _.filter($scope.listProjetsSecteur,{'id':$scope.projet.idSecteur})[0];
            
            // Liste des autres projets dans le même secteur
            $scope.listOtherProjetsSecteur = _.filter($scope.listProjets, {'idSecteur':parseInt($scope.projet.idSecteur)});
        },err => {
          console.log(err);
        });

        var getLikeEntity =  function () {
            ModelLike.get(params_get_comments)
            .then(function (data) {
                $scope.nbLike = data.data;
            });
        }
        getLikeEntity();

        var getListMediasEntity =  function () {
            ModelMedia.list(params_get_comments)
            .then(function (data) {
                // Liste des médias du projet
                var medias_projets = data.data;
                // Récupération du fichier de synthèse du PAG
                $scope.get_synthese_file = _.filter(medias_projets,{'mediaType':'document','nom':'fiche-projet'})[0];
            });
        }
        getListMediasEntity();

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
                params.entityType = "PROJET";
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
                var checkCookie = cookieModel.getProjet();
                if(checkCookie.comment.indexOf(params.entityId) === -1){
                    /* var setCookie = cookieModel.setProjet('comment',params.entityId);
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    } */
                ModelComment.post(params)
                .then(function(data){
                    var setCookie = cookieModel.setProjet('comment',params.entityId);
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
                });
            }else {
                toogleToaster('error','Alerte',"Vous avez déjà commenté ");
            }
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
            var checkCookie = cookieModel.getProjet();
            if(checkCookie.like.indexOf(params.entityId) === -1){
                /* var setCookie = cookieModel.setProjet('like',params.entityId);
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
                    var setCookie = cookieModel.setProjet('like',params.entityId);
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
            var params = {
                entityType:'PROJET',
                entityId:$stateParams.id,
                noteType:noteType
            }

            // Check double action and Save to cookie
            var checkCookie = cookieModel.getProjet();
            if(checkCookie.note.indexOf(params.entityId) === -1){
                /* var setCookie = cookieModel.setProjet('note',params.entityId);
                if(setCookie.STATUS === 300) {
                    toogleToaster('error','Alerte',setCookie.STATUS.message);
                } */

                ModelNote.note(params)
                    .then( function (data){
                        $scope.waiting = false;
                        getNoteEntity();
                        var setCookie = cookieModel.setProjet('note',params.entityId);
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
                $scope.noteEntity.total = $scope.noteEntity.noteFiveCounts
                 + $scope.noteEntity.noteFourCounts + $scope.noteEntity.noteOneCounts
                 + $scope.noteEntity.noteThreeCounts + $scope.noteEntity.noteTwoCounts;
                $scope.noteEntity.notes = {};
                $scope.noteEntity.notes[1] = $scope.noteEntity.noteOneCounts;
                $scope.noteEntity.notes[2] = $scope.noteEntity.noteTwoCounts;
                $scope.noteEntity.notes[3] = $scope.noteEntity.noteThreeCounts;
                $scope.noteEntity.notes[4] = $scope.noteEntity.noteFourCounts;
                $scope.noteEntity.notes[5] = $scope.noteEntity.noteFiveCounts;

                console.log($scope.noteEntity);
            });
        }
        getNoteEntity();
    })
    ;

