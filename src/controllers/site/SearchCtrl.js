angular.module('pag-site')
.controller("SiteSearchCtrl", function (ModelPilier, ModelAxe, ModelSecteur, ModelProjet, $scope,$state, $stateParams) {
    $('ul.tabs').tabs({
      swipeable : true
    });

    $scope.search = {
        show:false,
        showAdvancedSearch:false,
        content:'',
        titleResults:''
    };

    /* Initialisation listes */
    $scope.listPiliers = [];
    $scope.listAxes = [];
    $scope.listSecteurs = [];
    $scope.listProjets = [];

    $scope.toggleSearch = function (){
        $scope.search.show = !$scope.search.show;
    }

    $scope.closeSearch = function (){
        $scope.search.show = false;
    }

    $scope.runSearch = function (){
        $scope.search.show = false;
        $state.go('search',{params:$scope.search,do:true});
    }

    $scope.toggleAdvancedSearch = function (){
        $scope.search.showAdvancedSearch = !$scope.search.showAdvancedSearch;
    }

    var getListPiliers = function () {
        ModelPilier.list()
            .then( function(data) {
                $scope.listPiliers = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    getListPiliers();

    var getListAxes = function () {
        ModelAxe.list()
            .then( function(data) {
                $scope.listAxes = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    getListAxes();
    var getListSecteurs = function () {
        ModelSecteur.list()
            .then( function(data) {
                $scope.listSecteurs = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    getListSecteurs();

    if($stateParams.do){
        console.log('DO search');
        $scope.results = {
            returnPiliers : false,
            returnAxes : false,
            returnSecteurs : false,
            returnProjets : false
        }
        var getListProjets = function () {
            ModelProjet.list()
                .then( function(data) {
                    $scope.listProjets = data.data;
                    $scope.listPiliersSearch = $scope.listProjets[0];
                }, function (error) {
                    console.log(error);
                });
        }
        getListProjets();
        // Do stuff
        $scope.search.titleResults = 'Résultats de votre recherche';
        $scope.search.content = $stateParams.params.content;

        $scope.results.returnPiliers = true;



    }
});
