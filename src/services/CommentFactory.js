angular.module('pag-site')
    .factory('ModelComment', function ($http, API) {
        return {
            list: function (params){
                return $http({
                    method: 'GET',
                    //url: API.url + '/comment/comments.json'
                    //url: API.comment_fonct_url + 'entityId=' + params.entityId + '&entityType=' + params.entityType
                    url: API.comment_fonct_url + params.entityType +'/' + params.entityId
                });
            },
            post: function (obj){
                return $http({
                    method: 'POST',
                    data: angular.toJson(obj),
                    //url: API.url + '/comment/post_comment.json'
                    url: API.comment_fonct_url
                })
            }
        }
    });