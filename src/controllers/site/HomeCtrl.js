angular.module('pag-site')
.controller("SiteHomeCtrl", function (ModelProjet, ModelAxe, $scope, leafletMapEvents, leafletData, ModelSecteur) {

  var getListSecteurs = function (){
    ModelSecteur.list()
      .then( function (data) {
        $scope.listSecteurs = data.data;
        console.log($scope.listSecteurs);
      }, function (error){

      })
  }
  getListSecteurs();
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

  var getListProjets = function (){
    ModelProjet.list()
    .then(function(data){
      //$scope.listProjets = data.data;
      $scope.listFourProjets = data.data.slice(0,4);
    }, function (error){
      console.log(error);
    });
  }
  getListProjets();

  var initializeMap = function (){
    $scope.listProjetsRegions = [];

    var feature = {
      "type": "Feature",
      "properties": {
        "text": 122,
        "labelPosition": [
          10.029513,
          3.187786
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10.029513, 3.187786]
      }
    };
    /* leafletData.getMap().then(function(map) {
      new L.labeledCircleMarker(
        feature.geometry.coordinates.slice().reverse(),
        feature, {
          markerOptions: { color: '#050' }
        }).addTo(map);
        //new L.Marker([10.029513,3.187786]).addTo(map);
    }); */

    var paths = {
      circle: {
        type: "circle",
        radius: 100 * 1000,
        stroke: false,

        latlngs: {
          lat: 10.029513,
          lng:  3.187786
        }
      }
    };
    var markers = [
      {
        lat: 9.357793,
        lng: 2.601571,
        message: "<h6>Titre du projet</h6><p>Une centrale solaire au Chili pour mieux répondre à la demande dans le centre du pays</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 6.522945,
        lng: 2.666289,
        message: "<h6>Titre du projet</h6><p>Une centrale solaire au Chili pour mieux répondre à la demande dans le centre du pays</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 9.389607,
        lng:  2.634361,
        message: "<h6>Titre du projet</h6><p>Une centrale solaire au Chili pour mieux répondre à la demande dans le centre du pays</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 10.189803,
        lng: 1.452991,
        message: "<h6>Titre du projet</h6><p>Une centrale solaire au Chili pour mieux répondre à la demande dans le centre du pays</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 10.029513,
        lng:  3.187786,
        message: "<h6>Titre du projet</h6><p>Une centrale solaire au Chili pour mieux répondre à la demande dans le centre du pays</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      }
    ];

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
      //paths: paths,
      markers: markers

    };

    // $scope.markers = new Array();
    //
    // $scope.$on('leafletDirectiveMap.zoomend', function (event, args) {
    //   if (args.leafletObject._zoom >= 9) {
    //     $scope.map.paths = [];
    //     $scope.map.markers = markers;
    //
    //     $scope.$on('leafletDirectiveMarker.click', function(event, args){
    //       $('#modal1').modal('open');
    //     });
    //
    //   }else{
    //     $scope.map.paths = paths;
    //     $scope.map.markers = [];
    //   }
    // });

  }

  initializeMap();
});
