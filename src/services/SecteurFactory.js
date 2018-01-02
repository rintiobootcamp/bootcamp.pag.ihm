angular.module('pag-site')
  .factory('ModelSecteur', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/secteur/secteur.json',
          url: API.cat_fonct_url + 'secteurs/'+ obj.id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/secteur/secteurs.json'
          url: API.cat_fonct_url + 'secteurs'
        });
      },
      countSecteurs: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'secteurs/count'
        });
      }
    }
  });
