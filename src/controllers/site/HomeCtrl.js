angular.module('pag-site')
.controller("SiteHomeCtrl", function (ModelProjet, ModelAxe, $scope, leafletMapEvents) {
  $scope.mapDefaults = {
    scrollWheelZoom: false
  };

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
        lat: 9.3217,
        lng: 2.3100,
        zoom: 7,
        markers: ''
      },

      defaults: {
        scrollWheelZoom: false
      },
      paths: {
        circle: {
          type: "circle",
          radius: 100 * 1000,
          stroke: false,

          latlngs: {
            lat: 10.029513,
            lng:  3.187786
          }
        }
      },

    };
    $scope.$on('leafletDirectiveMap.zoomend', function (event, args) {
      if (args.leafletObject._zoom >= 9) {
        $scope.map.paths = '';

        var markers = [
          {
            lat: 9.357793,
            lng: 2.601571,
            message: "",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 6.522945,
            lng: 2.666289,
            message: "",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 9.389607,
            lng:  2.634361,
            message: "",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 10.189803,
            lng: 1.452991,
            message: "",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          },

          {
            lat: 10.029513,
            lng:  3.187786,
            message: "",
            icon: {
              iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
              shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
            }
          }
        ];

        $scope.map.markers = markers;
        $scope.$on('leafletDirectiveMarker.click', function(event, args){
          if(!$scope.$$phase) {

          console.log($('.waves-effect'));
          $('.waves-effect').trigger('click');
        };

        });

      };
    });

  }


  initializeMap();

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
