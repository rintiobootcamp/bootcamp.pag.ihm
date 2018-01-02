angular.module('pag-site')
  .factory('ModelProjet', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/projet/projet.json'
          url: API.proj_fonct_url + '/' + obj.entityId
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          cache:true,
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
          cache:true,
          url:API.url + '/projet/projets_regions.json'
        });
      }
    }
  });
