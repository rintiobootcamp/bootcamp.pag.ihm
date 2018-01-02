angular.module('pag-site')
  .factory('ModelSondage', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          url: API.sondage_fonct_url + '/'+ obj.entityType + '/' + obj.entityId
        });
      },
      list: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          url: API.sondage_fonct_url
        });
      },
      vote: function(key, idSondage) {
        return $http({
          method: 'POST',
          url: API.sondage_fonct_url + '/' + idSondage + '/' + key,
          data: {}
        })
      },
      create: function(sondage) {
        return $http({
          method: 'POST',
          url: API.sondage_fonct_url,
          data: angular.toJson(sondage)
        })
      }
    }
  });
