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

        var europeCapitals = {
            Berlin: {
                lat: 52.5166667,
                lng: 13.4
            },
            Rome: {
                lat: 41.9,
                lng: 12.4833333
            },
            Paris: {
                lat: 48.866667,
                lng: 2.333333
            },
            Brussels: {
                lat: 50.8333,
                lng: 4
            }

        };

        var pathsDict = {
          circle: {
              type: "circle",
              radius: 500 * 1000,
              latlngs: europeCapitals.Brussels
          },

          circleMarker: {
              type: "circleMarker",
              radius: 50,
              latlngs: europeCapitals.Rome
          }
        };

        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 3
            },
            events: {},
            paths: {}
        });

        $scope.addShape = function(shape) {
            $scope.paths = {};
            $scope.paths[shape] = pathsDict[shape];
        };
        $scope.markers = [
          {
            lat: 7.876355,
            lng: 2.284468,
            message: "My Added Marker",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 6.522945,
            lng: 2.666289,
            message: "Ouémé",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 9.389607,
            lng:  2.634361,
            message: "Parakou",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 10.189803,
            lng: 1.452991,
            message: "Nati",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 10.029513,
            lng:  3.187786,
            message: "Nikki",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          }
        ];

    })
;
