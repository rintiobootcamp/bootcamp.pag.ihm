angular.module('pag-site')
  .factory('ModelMedia', function ($http, API) {
    return {
      list: function (params){
        return $http({
          method: 'GET',
          cache:true,
          url: API.media_fonct_url + '/' + params.entityType + '/' + params.entityId 
        });
      },
      save: function (obj){
        return $http({
          method: 'POST',
          data: angular.toJson(obj),
          url: API.media_fonct_url
        })
      },
      getAll: function (){
        return $http({
          method: 'GET',
          cache:true,
          url: API.media_fonct_url
        });
      }
    }
  });
