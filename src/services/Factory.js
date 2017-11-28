angular.module('pag-site')
    .factory('ModelPilier', function ($http, API) {
        return {
            get: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/pilier.json'
                });
            },
            list: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/piliers.json'
                });
            },
            listOther: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/piliers.json'
                });
            },
            
        }
    })