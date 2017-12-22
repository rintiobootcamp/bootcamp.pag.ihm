angular.module('pag-site')
    .factory('ModelAxe', function($http, API) {
        return {
            get: function(id) {
                return $http({
                    method: 'GET',
                    url: API.cat_fonct_url + 'axes/' + id
                });
            },
            list: function() {
                return $http({
                    method: 'GET',
                    url: API.cat_fonct_url + 'axes'
                });
            },
            countAxes: function() {
                return $http({
                    method: 'GET',
                    url: API.cat_fonct_url + 'axes/count'
                });
            },
            save: function(axe) {
                return $http({
                    method: axe.id ? 'PUT' : 'POST',
                    url: API.cat_fonct_url + 'axes',
                    data: angular.toJson(axe)
                })
            },
            delete(axe_id) {
                return $http({
                    method: 'DELETE',
                    url: API.cat_fonct_url + 'axes/' + axe_id
                })
            }
        }
    });
