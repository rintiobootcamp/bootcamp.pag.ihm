angular.module('pag-site')
    .factory('ModelMedia', function ($http, API) {
        return {
            list: function (params){
                return $http({
                    method: 'GET',
                    // params : 
                        //  "entityId" : params.entityId //0
                        //  "entityType" : params.entityType //"COMMENTAIRE"
                    url: API.url + '/media/get_media.json'
                });
            },
            save: function (obj){
                return $http({
                    method: 'POST',
                    data: angular.toJson(obj),
                    url: API.url + '/media/post_media.json'
                })
            }
        }
    });