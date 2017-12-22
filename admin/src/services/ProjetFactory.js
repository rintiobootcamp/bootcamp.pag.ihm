angular.module('pag-site')
    .factory('ModelProjet', function($http, API) {
        return {
            get: function(id) {
                return $http({
                    method: 'GET',
                    url: API.proj_fonct_url + '/' + id
                });
            },
            list: function() {
                return $http({
                    method: 'GET',
                    url: API.proj_fonct_url
                });
            },
            listBySecteur: function(idSecteur) {
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/projets_one_secteur.json'
                });
            },
            countProjets: function() {
                return $http({
                    method: 'GET',
                    url: API.proj_fonct_url + '/count'
                });
            },
            listByRegions: function() {
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/projets_regions.json'
                });
            },
            save: function(projet) {
                return $http({
                    method: projet.id ? 'PUT' : 'POST',
                    url: API.proj_fonct_url,
                    data: angular.toJson(projet)
                })
            },
            delete(projet_id) {
                return $http({
                    method: 'DELETE',
                    url: API.proj_fonct_url + '/' + projet_id
                })
            }
        }
    });
