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
            }
        }
    });