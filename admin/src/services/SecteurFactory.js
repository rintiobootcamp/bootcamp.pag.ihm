angular.module('pag-site')
  .factory('ModelSecteur', function ($http, API) {
    return {
      get: function (id){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'secteurs/'+ id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'secteurs'
        });
      },
      create: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + 'secteur',
          data: angular.toJson(secteur)
        })
      },
      update: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + 'secteur/' + secteur.id,
          data: angular.toJson(secteur)
        });
      },
      delete(secteur_id) {
        return $http({
          method: 'DELETE',
          url: API.cat_fonct_url + 'secteurs/' + secteur_id
        })
      }
    }
  });
