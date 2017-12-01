angular.module('pag-site')
    .controller("SiteHomeCtrl", function (ModelProjet, ModelAxe, $scope) {

        var getListProjetsByRegions = function (){
            ModelProjet.listByRegions()
                .then(function(data){
                    $scope.markersProjets = data.data;
                    initializeMap();
                }, function (error){
                    console.log(error);
                });
        };
        getListProjetsByRegions();

        var initializeMap = function (){
            $scope.listProjetsRegions = [];
            $scope.map = {
                center: {
                    latitude: 9.3217,
                    longitude: 2.3100
                },
                zoom: 7,
                markers: $scope.markersProjets, // array of models to display
                markersEvents: {
                    click: function(marker, eventName, model, arguments) {
                        $scope.map.window.model = model;
                        $scope.map.window.show = true;
                    }
                },
                window: {
                    marker: {},
                    show: false,
                    closeClick: function() {
                        this.show = false;
                    },
                    options: {} // define when map is ready
                }
                
            };
        }

        var getCountAxes = function (){
            ModelAxe.countAxes()
                .then(function(data){
                    $scope.count_axes = data.data.count;
                }, function (error){
                    console.log(error);
                });
        }
        getCountAxes();

        var getCountProjets = function (){
            ModelProjet.countProjets()
                .then(function(data){
                    $scope.count_projets = data.data.count;
                }, function (error){
                    console.log(error);
                });
        }
        getCountProjets();
    });

