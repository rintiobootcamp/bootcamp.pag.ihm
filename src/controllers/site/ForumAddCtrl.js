angular.module('pag-site')
  .controller("SiteForumAddCtrl", function ($scope,$q, $state, ModelSecteur, ModelPilier, ModelAxe, ModelProjet, Upload, API, cookieModel, ModelComment, ModelDebat) {
    console.log('Add controller');
    
    $scope.sujet = {
      forum:{},
      pseudo:'',
      userMail:'',
      contenu:'',
      titre:'',
      files:[]
    }
    
    $q.all([ModelPilier.list(),ModelAxe.list(),ModelSecteur.list(), ModelProjet.list()])
      .then(values => {
        //$scope.listSecteurs = values[0].data;
        //$scope.listPiliers = values[1].data;
        //$scope.listAxes = values[2].data;
        //$scope.listProjets = values[3].data;
        makeSelectForum(values);
      }, err => {
        console.log(err);
      });

      function makeSelectForum(object) {
        // Make list 
        $scope.listForum = [];
        angular.forEach(object, function(value1, key1){
          angular.forEach(value1.data, function(value, key){
            switch(key1) {
              case 0 : var type = 'Piliers';
                    var entityType = "PILIER";
                break;
              case 1 : var type = 'Axes';
                  var entityType = "AXE";
                break;
              case 2 : var type = 'Secteurs';
                  var entityType = "SECTEUR";
                break;
              case 3 : var type = 'Projets';
                  var entityType = "PROJET";
                break;
              default: var type = '';
                break;
            }
            $scope.listForum.push({id:value.id,nom:value.nom,type:type, entityType:entityType});
          });
        });
      }

      $scope.submit = function (){
        var params = {};
            if($scope.sujet.pseudo !='')
                params.pseudo = $scope.sujet.pseudo;
            if($scope.sujet.userMail !='')
                params.userMail = $scope.sujet.userMail;
            params.contenu = $scope.sujet.contenu;
            //console.log(params);

            var params_create = {
              entityId: parseInt($scope.sujet.forum.id),
              entityType: $scope.sujet.forum.entityType,
              sujet: $scope.sujet.titre,
              pseudo: $scope.sujet.pseudo,
              userMail: $scope.sujet.userMail
            }
            ModelDebat.create(params_create)
              .then(function(debat){
                // Save Pseudo if user choose once
                if($scope.sujet.pseudo !=''){
                    cookieModel.setUser('pseudo',$scope.sujet.pseudo);
                }
                // Save userMail if user choose once
                if($scope.sujet.userMail !=''){
                    cookieModel.setUser('email',$scope.sujet.userMail);
                }
                params.entityType = "DEBAT";
                params.entityId = debat.data.id;

                ModelComment.post(params)
                .then(function(data){
                    /* var setCookie = cookieModel.setDebat('comment',parseInt(debat.data.id));
                    if(setCookie.STATUS === 300) {
                        toogleToaster('error','Alerte',setCookie.STATUS.message);
                    } */
                    if($scope.sujet.files.length > 0) {
                        uploadFiles($scope.sujet.files, data.data.id);
                    }else {
                      $state.go('forum');
                    }
                    $scope.sujet = {};
                }, function (error){
                    console.log(error);
                });
            }, function (error){

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
      $state.go('forum');
    }

      $scope.addSujetTinymceOptions =  {
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
