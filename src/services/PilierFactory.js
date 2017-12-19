angular.module('pag-site')
  .factory('ModelPilier', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          url: API.url + '/pilier/pilier.json'
          //url: API.cat_fonct_url + 'piliers/'+ obj.id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          //
          url: API.url + '/pilier/piliers.json'
          //url: API.cat_fonct_url + 'piliers'

        });
      },
      create: function(pilier) {
        return $http({
          method: 'POST',
          //url: API.url + '/pilier',
          url: API.cat_fonct_url + 'piliers',
          data: angular.toJson(pilier)
        })
      },
      update: function(pilier) {
        return $http({
          method: 'POST',
          //url: API.url + '/pilier/' + pilier.id,
          url: API.cat_fonct_url + 'piliers/' + pilier.id,
          data: angular.toJson(pilier)
        });
      },
      delete(pilier_id) {
        return $http({
          method: 'DELETE',
          //url: API.url + '/pilier/' + pilier_id
          url: API.cat_fonct_url + 'piliers/' + pilier_id
        })
      }
    }
  });
