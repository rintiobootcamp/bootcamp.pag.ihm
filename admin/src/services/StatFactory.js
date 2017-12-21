angular.module('pag-site')
    .factory('StatProjet', function($http, API) {
        return {
            get: function(entity, id, startDate, endDate) {
                var query = '?' + (startDate ? 'startDate=' + startDate : '');
                query += endDate ? '&endDate=' + endDate : '';
                return $http({
                    method: 'GET',
                    url: API.stat_fonct_url + '/' + entity + '/' + id + query
                });
            }
        }
    });
