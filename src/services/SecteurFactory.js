angular.module('pag-site')
  .factory('ModelSecteur', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          //url: API.url + '/secteur/secteur.json',
          url: API.cat_fonct_url + 'secteurs/'+ obj.id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/secteur/secteurs.json'
          url: API.cat_fonct_url + 'secteurs'
        });
      },
      create: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + '/secteur',
          data: angular.toJson(secteur)
        })
      },
      update: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + '/secteur/' + secteur.id,
          data: angular.toJson(secteur)
        });
      },
      delete(secteur_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/secteur' + secteur_id
        })
      }
    }
  });
