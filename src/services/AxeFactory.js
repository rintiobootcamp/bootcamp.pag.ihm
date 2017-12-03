angular.module('pag-site')
  .factory('ModelAxe', function ($http, API) {
    return {
      get: function (){
        return $http({
          method: 'GET',
          url: API.url + '/axe/axe.json'
        });
      },
      listPiliers: function (){
        return $http({
          method: 'GET',
          url: API.url + '/axe/axes_axes.json'
        });
      },
      list: function (){
        return $http({
          method: 'GET',
          url: API.url + '/axe/axes.json'
        });
      },
      countAxes: function (){
        return $http({
          method: 'GET',
          url: API.url + '/axe/count_axes.json'
        });
      },
      create: function(axe) {
        return $http({
          method: 'POST',
          url: API.url + '/axe',
          body: body
        })
      },
      update: function(axe) {
        return $http({
          method: 'POST',
          url: API.url + '/axe' + axe_id,
          body: body
        }).map((res: Response) => res.json());
      },
      delete(axe_id) {
        return $http({
          method: 'DELETE',
          url: API.url + '/axe' + axe_id
        })
      }
    }
  });
