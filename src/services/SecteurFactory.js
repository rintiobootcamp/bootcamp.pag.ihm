angular.module('pag-site')
  .factory('ModelSecteur', function ($http, API) {
    return {
      get: function (){
        return $http({
          method: 'GET',
          url: API.url + '/secteur/secteur.json'
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.url + '/secteur/projets_secteurs.json'
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
