angular.module('pag-site')
  .factory('ModelMedia', function ($http, API) {
    return {
      list: function (params){
        return $http({
          method: 'GET',
          //url: API.url + '/media/get_media.json'
          url: API.media_fonct_url + '/' + params.entityType + '/' + params.entityId 
        });
      },
      save: function (obj){
        return $http({
          method: 'POST',
          data: angular.toJson(obj),
          //url: API.url + '/media/post_media.json'
          url: API.media_fonct_url
        })
      },
      getAll: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/media/get_media.json'
          url: API.media_fonct_url
        });
      }
    }
  });
