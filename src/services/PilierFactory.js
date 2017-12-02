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
              var headers = new Headers({ 'Content-Type': 'application/json' });
              var options = new RequestOptions({ headers: headers });
              var body = JSON.stringify(pilier);

              return $http({
                method: 'POST',
                url: API.url + '/pilier',
                body: body,
                option: option
              })
            },
            update: function(pilier) {
              var headers = new Headers({ 'Content-Type': 'application/json' });
              var options = new RequestOptions({ headers: headers });
              var body = JSON.stringify(pilier);

              return $http({
                method: 'POST',
                url: API.url + '/pilier' + pilier_id,
                body: body,
                option: option
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
