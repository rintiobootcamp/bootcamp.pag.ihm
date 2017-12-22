angular.module('pag-site')
  .controller("SiteForumCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, ModelDebat) {
    $q.all([ModelSecteur.list(),ModelPilier.list(),ModelAxe.list(), ModelProjet.list(),ModelDebat.list()])
      .then(values => {
        $scope.listSecteurs = values[0].data;
        $scope.listPiliers = values[1].data;
        $scope.listAxes = values[2].data;
        $scope.listProjets = values[3].data;

        $scope.listDebats = values[4].data;
        angular.forEach($scope.listDebats, function (debat, i) {
          var secteur_debat = '';
          switch (debat.entityType) {
            case 'PILIER':
              secteur_debat = _.filter($scope.listPiliers,{'id':debat.entityId})[0];
              break;
            case 'AXE':
              secteur_debat = _.filter($scope.listAxes,{'id':debat.entityId})[0];
            break;
            case 'SECTEUR':
              secteur_debat = _.filter($scope.listSecteurs,{'id':debat.entityId})[0];
            break;
            case 'PROJET':
              secteur_debat = _.filter($scope.listProjets,{'id':parseInt(debat.entityId)})[0];
            break;
          
            default:
              break;
          }
          if(secteur_debat != undefined )
            debat.secteur = secteur_debat.nom;
          else debat.secteur = 'Non défini';
        });
        $scope.globalListSondages = $scope.listDebats;
      }, err => {
        console.log(err);
      });

      $scope.filter = function (type, id){
        $scope.listDebats = _.filter($scope.globalListSondages,{'entityId':parseInt(id),'entityType':type});
      }
  })

  .controller("SiteDebatCtrl", function ($sce, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, $scope,$stateParams, CONST, API, Upload,$q, ModelComment, ModelMedia, cookieModel, toaster, ModelDebat) {
    var params_get_entity = {
      entityId:$stateParams.id
    }
    var params_get_comments = {
      entityId:$stateParams.id,
      entityType: 'DEBAT'
    }
    
    var getPilier = function (obj){
      ModelPilier.get(obj)
        .then(function (data){
          console.log(data);
          $scope.debat.secteur = data.data.nom;
        }, function (){

        });
    }
    var getAxe = function (){
      ModelAxe.get(obj)
        .then(function (data){
          $scope.debat.secteur = data.data.nom;
        }, function (){

        });
    }
    var getSecteur = function (){
      ModelSecteur.get(obj)
        .then(function (data){
          $scope.debat.secteur = data.data.nom;
        }, function (){

        });
    }
    var getProjet = function (){
      ModelProjet.get(obj)
        .then(function (data){
          $scope.debat.secteur = data.data.nom;
        }, function (){

        });
    }
    
    var getDebat = function (obj){
      ModelDebat.get(obj)
        .then(function (data){
          $scope.debat = data.data;
          var obj = {};
          switch ($scope.debat.entityType) {
            case 'PILIER':
              obj.entityId = $scope.debat.id;
              getPilier(obj);
              break;
            case 'AXE':
              obj.entityId = $scope.debat.id;
              getAxe(obj);
            break;
            case 'SECTEUR':
              obj.entityId = $scope.debat.id;
              getSecteur(obj);
            break;
            case 'PROJET':
              obj.entityId = $scope.debat.id;
              getProjet(obj);
            break;
          
            default:
              $scope.debat.secteur = {};
              break;
          }
          var params_get_rubrique = {
            entityId: data.data.entityId,
            entityType: data.data.entityType
          }
          getListDebatRubrique(params_get_rubrique);
        }, function (error){
          console.log(error);
        });
    }
    getDebat(params_get_entity);

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
        }, function (error){
            console.log(error);
        });
    }

    var getListDebatRubrique = function (params){
      ModelDebat.getByEntity(params)
        .then(function(data){
          $scope.listOtherDebats = data.data;
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
          params.entityType = "DEBAT";
          params.entityId  = parseInt($stateParams.id);
          if($scope.comment.pseudo !='')
              params.pseudo = $scope.comment.pseudo;
          if($scope.comment.userMail !='')
              params.userMail = $scope.comment.userMail;
          params.contenu = $scope.comment.contenu;
          //console.log(params);
          // Check double action and Save to cookie
          /* var checkCookie = cookieModel.getDebat();
          if(checkCookie.comment.indexOf(params.entityId) === -1){ */
              ModelComment.post(params)
              .then(function(data){
                // Save Pseudo if user choose once
                  if($scope.comment.pseudo !=''){
                    cookieModel.setUser('pseudo',$scope.comment.pseudo);
                }
                // Save userMail if user choose once
                if($scope.comment.userMail !=''){
                    cookieModel.setUser('email',$scope.comment.userMail);
                }
                  /* var setCookie = cookieModel.setDebat('comment',params.entityId);
                  if(setCookie.STATUS === 300) {
                      toogleToaster('error','Alerte',setCookie.STATUS.message);
                  } */
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
         /*  }else {
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

})
