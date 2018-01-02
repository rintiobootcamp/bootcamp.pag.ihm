angular.module('pag-site')
  .factory('ModelAxe', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          cache:true,
          //url: API.url + '/axe/axe.json',
          url: API.cat_fonct_url + 'axes/'+ obj.entityId
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          cache:true,
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
      }
    }
  });
