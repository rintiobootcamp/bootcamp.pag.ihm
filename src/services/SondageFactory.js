angular.module('pag-site')
  .factory('ModelSondage', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          url: API.sondage_fonct_url + '/'+ obj.entityType + '/' + obj.entityId
        });
      },
      list: function (obj){
        return $http({
          method: 'GET',
          url: API.sondage_fonct_url
        });
      },
      vote: function(sondage) {
        return $http({
          method: 'PUT',
          url: API.sondage_fonct_url,
          data: angular.toJson(sondage)
        })
      }
    }
  });
