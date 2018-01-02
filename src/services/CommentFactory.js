angular.module('pag-site')
    .factory('ModelComment', function ($http, API) {
        return {
            list: function (params){
                return $http({
                    method: 'GET',
                    cache:true,
                    url: API.comment_fonct_url + '/' + params.entityType +'/' + params.entityId
                });
            },
            post: function (obj){
                return $http({
                    method: 'POST',
                    data: angular.toJson(obj),
                    url: API.comment_fonct_url
                })
            }
        }
    });