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
                body: body
              })
            },
            update: function(pilier) {
              return $http({
                method: 'POST',
                url: API.url + '/pilier' + pilier_id,
                body: body
              }).map((res: Response) => res.json());
            },
            delete(pilier_id) {
              return $http({
                method: 'DELETE',
                url: API.url + '/pilier' + pilier_id
              })
            }
        }
    });
