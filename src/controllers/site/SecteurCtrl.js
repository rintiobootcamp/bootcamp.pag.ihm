angular.module('pag-site')
    .controller("SiteSecteursCtrl", function (ModelSecteur, $scope) {
        var getListSecteurs = function () {
            ModelSecteur.list()
                .then( function(data) {
                    $scope.listSecteurs = data.data;
                }, function (error) {
                    console.log(error);
                });
        }
        getListSecteurs();
    });
