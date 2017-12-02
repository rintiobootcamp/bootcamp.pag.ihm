angular.module('pag-site')
    .factory('ModelComment', function ($http, API) {
        return {
            list: function (params){
                return $http({
                    method: 'GET',
                    // params : 
                        //  "entityId" : params.entityId //0
                        //  "entityType" : params.entityType //"COMMENTAIRE"
                    url: API.url + '/comment/comments.json'
                });
            },
            save: function (obj){
                return $http({
                    method: 'POST',
                    data: angular.toJson(obj),
                    url: API.url + '/comment/post_comment.json'
                })
            }
        }
    });