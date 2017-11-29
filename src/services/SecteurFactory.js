angular.module('pag-site')
    .factory('ModelSecteur', function ($http, API) {
        return {
            get: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/secteur/secteur.json'
                });
            },
            list: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/secteur/projets_secteurs.json'
                });
            }
        }
    });