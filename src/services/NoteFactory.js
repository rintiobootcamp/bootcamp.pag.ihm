angular.module('pag-site')
  .factory('ModelNote', function ($http, API) {
    return {
      get: function (obj){
        return $http({
          method: 'GET',
          //url:  API.url + '/note/notes.json',
          url: API.note_fonct_url + '/' + obj.entityType + '/' + obj.entityId
        });
      },
      note : function(note) {
        return $http({
          method: 'POST',
          url: API.note_fonct_url,
          data: angular.toJson(note)
        })
      }
    }
  });
