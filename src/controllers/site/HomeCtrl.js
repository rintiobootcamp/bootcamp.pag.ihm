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
        message: "<h6>Les projets dans cette région</h6><p>- Faire de la Pendjari/W le parc de référence de l'Afrique de l'Ouest </p><p>- Réinventer la cité lacustre de Ganvié</p><p>- Pôle touristique d'Abomey/Porto-Novo: Arts, Cultures, et Arènes d'expression Vaudou</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 6.522945,
        lng: 2.666289,
        message: "<h6>Les projets dans cette région</h6><p>- Créer une expérience touristique premium autour des TATA SOMBA</p><p>- Recréer à l’identique la cité historique de ouidah</p><p>- Aménager des stations balnéaires</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 9.389607,
        lng:  2.634361,
        message: "<h6>Les projets dans cette région</h6><p>- Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)</p><p>- Renforcer les filières conventionnelles  (riz, maïs, manioc)</p><p>- </p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 10.189803,
        lng: 1.452991,
        message: "<h6>Les projets dans cette région</h6><p>- Développer l’aquaculture continentale</p><p>- Mettre en valeur la basse et moyenne Vallée  de l’Ouémé</p><p>- Augmenter la production de viande, de lait  et d’œufs de table</p>",
        icon: {
          iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
          shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
        }
      },

      {
        lat: 10.029513,
        lng:  3.187786,
        message: "<h6>Les projets dans cette région</h6><p>- Construction d’un nouvel aéroport international</p><p>- Modernisation et extension du port</p>",
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
        scrollWheelZoom: false,
        dragging: false,
        tap: true,
        panControl: true
      },
      //paths: paths,
      markers: markers
    };
  }

  initializeMap();
});
