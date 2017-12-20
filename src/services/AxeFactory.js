angular.module('pag-site')
  .factory('ModelAxe', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          //url: API.url + '/axe/axe.json',
          url: API.cat_fonct_url + 'axes/'+ obj.id
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/axe/axes.json',
          url: API.cat_fonct_url + 'axes'
        });
      },
      countAxes: function (){
        return $http({
          method: 'GET',
          //url: API.url + '/axe/count_axes.json'
          url: API.cat_fonct_url + 'axes/count'
        });
      },
      create: function(axe) {
        return $http({
          method: 'POST',
          url: API.url + '/axe',
          data: angular.toJson(axe)
        })
      },
      update: function(axe) {
        return $http({
          method: 'POST',
          url: API.url + '/axe/' + axe.id,
          data: angular.toJson(axe)
        });
      },
      delete(axe_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/axe/' + axe_id
        })
      }
    }
  });
