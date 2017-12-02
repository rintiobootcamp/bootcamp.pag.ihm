angular.module('pag-site')
    .factory('ModelProjet', function ($http, API) {
        return {
            get: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/projet.json'
                });
            },
            list: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/projets_secteurs.json'
                });
            },
            listBySecteur: function (idSecteur){
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/projets_one_secteur.json'
                });
            },
            countProjets: function (){
                return $http({
                    method: 'GET',
                    url: API.url + '/projet/count_projets.json'
                });
            },
            listByRegions: function (){
                return $http({
                    method:'GET',
                    url:API.url + '/projet/projets_regions.json'
                });
            }
        }
    });