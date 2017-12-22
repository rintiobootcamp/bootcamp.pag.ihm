angular.module('pag-site')
    .factory('ModelPilier', function($http, API) {
        return {
            get: function(id) {
                return $http({
                    method: 'GET',
                    url: API.cat_fonct_url + 'piliers/' + id
                });
            },
            list: function() {
                return $http({
                    method: 'GET',
                    url: API.cat_fonct_url + 'piliers'

                });
            },
            save: function(pilier) {
                return $http({
                    method: pilier.id ? 'PUT' : 'POST',
                    url: API.cat_fonct_url + 'piliers',
                    data: angular.toJson(pilier)
                })
            },
            delete(pilier_id) {
                return $http({
                    method: 'DELETE',
                    url: API.cat_fonct_url + 'piliers/' + pilier_id
                })
            }
        }
    });
