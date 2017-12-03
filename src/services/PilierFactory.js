angular.module('pag-site')
  .factory('ModelPilier', function ($http, API) {
    return {
      get: function (){
        return $http({
          method: 'GET',
          url: API.url + '/pilier/pilier.json'
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.url + '/pilier/piliers.json'
        });
      },
      create: function(pilier) {
        return $http({
          method: 'POST',
          url: API.url + '/pilier',
          data: angular.toJson(pilier)
        })
      },
      update: function(pilier) {
        return $http({
          method: 'POST',
          url: API.url + '/pilier/' + pilier.id,
          data: angular.toJson(pilier)
        });
      },
      delete(pilier_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/pilier/' + pilier_id
        })
      }
    }
  });
