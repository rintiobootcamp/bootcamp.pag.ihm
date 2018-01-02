angular.module('pag-site')
  .factory('ModelPilier', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/pilier/pilier.json'
          url: API.cat_fonct_url + 'piliers/'+ obj.entityId
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/pilier/piliers.json'
          url: API.cat_fonct_url + 'piliers'

        });
      },
      countPiliers: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'piliers/count'
        });
      }
    }
  });
