angular.module('pag-site')
  .factory('ModelPhase', function ($http, API) {
    return {
      get: function (id){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'phases/'+ id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'phases'

        });
      },
      create: function(phase) {
        return $http({
          method: 'POST',
          url: API.cat_fonct_url + 'phases',
          data: angular.toJson(phase)
        })
      },
      update: function(phase) {
        return $http({
          method: 'POST',
          url: API.cat_fonct_url + 'phases/' + phase.id,
          data: angular.toJson(phase)
        });
      },
      delete(phase_id) {
        return $http({
          method: 'DELETE',
          url: API.cat_fonct_url + 'phases/' + phase_id
        })
      }
    }
  });
