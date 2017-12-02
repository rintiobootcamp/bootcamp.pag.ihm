angular.module('pag-site')
  .factory('ModelProjet', function ($http, API) {
    return {
      get: function (){
        return $http({
          method: 'GET',
          url: API.url + '/projet/projet.json'
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.url + '/projet/projets_secteurs.json'
        });
      },
      listBySecteur: function (idSecteur){
        return $http({
          method: 'GET',
          url: API.url + '/projet/projets_one_secteur.json'
        });
      },
      countProjets: function (){
        return $http({
          method: 'GET',
          url: API.url + '/projet/count_projets.json'
        });
      },
      listByRegions: function (){
        return $http({
          method:'GET',
          url:API.url + '/projet/projets_regions.json'
        });
      },
      create: function(projet) {
        return $http({
          method: 'POST',
          url: API.url + '/projet',
          body: body
        })
      },
      update: function(projet) {
        return $http({
          method: 'POST',
          url: API.url + '/projet' + projet_id,
          body: body
        }).map((res: Response) => res.json());
      },
      delete(projet_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/projet' + projet_id
        })
      }
    }
  });
