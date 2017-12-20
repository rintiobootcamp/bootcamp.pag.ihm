angular.module('pag-site')
  .factory('ModelAxe', function ($http, API) {
    return {
      get: function (id){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'axes/'+ id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'axes'
        });
      },
      countAxes: function (){
        return $http({
          method: 'GET',
          url: API.cat_fonct_url + 'axes/count'
        });
      },
      create: function(axe) {
        return $http({
          method: 'POST',
          url: API.cat_fonct_url + 'axes',
          data: angular.toJson(axe)
        })
      },
      update: function(axe) {
        return $http({
          method: 'PUT',
          url: API.cat_fonct_url + 'axe/' + axe.id,
          data: angular.toJson(axe)
        });
      },
      delete(axe_id) {
        return $http({
          method: 'DELETE',
          url: API.cat_fonct_url + 'axes/' + axe_id
        })
      }
    }
  });
