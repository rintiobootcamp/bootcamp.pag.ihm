angular.module('pag-site')
  .factory('ModelWidget', function ($http, API) {
    var accessToken = "4d42ae522a434e15b001e460640e4058";
    var baseUrl = "https://api.api.ai/v1/";
    return {
      get: function (text){
        return $http({
          method: 'POST',
          url: baseUrl + "query?v=20150910",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
              "Authorization": "Bearer " + accessToken
          },
          data: JSON.stringify({ query: text, lang: "fr", sessionId: "somerandomthing" }),
        });
      }
    }
  });
