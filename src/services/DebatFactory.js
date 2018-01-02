angular.module('pag-site')
  .factory('ModelDebat', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          url: API.debat_fonct_url + '/' + obj.entityId
        });
      },
      getByEntity: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          url: API.debat_fonct_url + '/'+ obj.entityType + '/' + obj.entityId
        });
      },
      list: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          url: API.debat_fonct_url
        });
      },
      create: function (obj){
        return $http({
          method:'POST',
          url:API.debat_fonct_url,
          data:angular.toJson(obj)
        });
      }
    }
  });
