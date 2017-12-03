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
          url: API.url + '/secteur/secteurs_secteurs.json'
        });
      },
      create: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + '/secteur',
          body: body
        })
      },
      update: function(secteur) {
        return $http({
          method: 'POST',
          url: API.url + '/secteur' + secteur_id,
          body: body
        }).map((res: Response) => res.json());
      },
      delete(secteur_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/secteur' + secteur_id
        })
      }
    }
  });
