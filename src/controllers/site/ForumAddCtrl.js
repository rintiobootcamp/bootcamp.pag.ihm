angular.module('pag-site')
  .controller("SiteForumAddCtrl", function ($scope,$q, ModelSecteur, ModelPilier, ModelAxe, ModelProjet) {
    console.log('Add controller');
    $q.all([ModelPilier.list(),ModelAxe.list(),ModelSecteur.list(), ModelProjet.list()])
      .then(values => {
        //$scope.listSecteurs = values[0].data;
        //$scope.listPiliers = values[1].data;
        //$scope.listAxes = values[2].data;
        //$scope.listProjets = values[3].data;

        // Make list 
        $scope.listForum = [];
        function doForeach(object) {
          angular.forEach(object, function(value1, key1){
            angular.forEach(value1.data, function(value, key){
              switch(key1) {
                case 0 : var type = 'Piliers';
                  break;
                case 1 : var type = 'Axes';
                  break;
                case 2 : var type = 'Secteurs';
                  break;
                case 3 : var type = 'Projets';
                  break;
                default: var type = 'Projets';
                  break;
              }
              $scope.listForum.push({id:value.id,nom:value.nom,type:type});
            });
          });
        }
        doForeach(values);
      }, err => {
        console.log(err);
      });

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
