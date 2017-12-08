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
    .controller("SiteOneAxeCtrl", function(ModelAxe, ModelMedia, ModelComment, $scope,$stateParams,$q){

        var params_get_entity = {
            id:$stateParams.id
        }

        $q.all([ModelAxe.list(), ModelAxe.get(params_get_entity)])
        .then( values => {
            $scope.listAxes = values[0].data;
            $scope.axe = values[1].data;
        });

        var params_get_comments = {
            entityId:$stateParams.id,
            entityType: 'AXE'
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
                entityType : "AXE",
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
