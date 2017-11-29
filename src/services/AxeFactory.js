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
                    url: API.url + '/axe/piliers_axes.json'
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
            }
        }
    });