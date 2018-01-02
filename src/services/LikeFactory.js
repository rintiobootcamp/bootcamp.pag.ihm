angular.module('pag-site')
    .factory('ModelLike', function ($http, API) {
        return {
            get: function (params){
                return $http({
                    method: 'GET',
                    cache:true,
                    url: API.like_fonct_url + '/' + params.entityType +'/' + params.entityId
                });
            },
            post: function (obj){
                return $http({
                    method: 'POST',
                    data: angular.toJson(obj),
                    url: API.like_fonct_url
                })
            }
        }
    });