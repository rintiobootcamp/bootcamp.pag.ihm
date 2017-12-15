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
          method: 'POST',
          url: API.sondage_fonct_url + '/' + sondage.id + '/' + sondage.voted,
          data: {}
        })
      },
      create: function(sondage) {
        return $http({
          method: 'POST',
          url: API.sondage_fonct_url,
          data: angular.toJson(sondage)
        })
      },
      update: function(pilier) {
        return $http({
          method: 'POST',
          //url: API.url + '/pilier/' + pilier.id,
          url: API.sondage_fonct_url + '/' + pilier.id,
          data: angular.toJson(pilier)
        });
      },
      delete(pilier_id) {
        return $http({
          method: 'DELETE',
          //url: API.url + '/pilier/' + pilier_id
          url: API.sondage_fonct_url + '/' + pilier_id
        })
      }
    }
  });
