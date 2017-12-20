angular.module('pag-site')
  .factory('ModelProjet', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          //url: API.url + '/projet/projet.json'
          url: API.proj_fonct_url + '/' + obj.id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/projet/projets.json'
          url: API.proj_fonct_url
        });
      },
      countProjets: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/projet/count_projets.json',
          url: API.proj_fonct_url + '/count'
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
          data: angular.toJson(projet)
        })
      },
      update: function(projet) {
        return $http({
          method: 'POST',
          url: API.url + '/projet/' + projet.id,
          data: angular.toJson(projet)
        });
      },
      delete(projet_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/projet/' + projet_id
        })
      }
    }
  });
