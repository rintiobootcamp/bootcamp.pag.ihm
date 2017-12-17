angular.module('pag-site')
  .factory('cookieModel', function ($http, API, $cookies) {
    var cookie = {
      PILIER:{
        comment:[],
        note:[],
        like:[]
      },
      AXE:{
        comment:[],
        note:[],
        like:[]
      },
      SECTEUR:{},
      PROJET:{
        comment:[],
        note:[],
        like:[]
      },
      DEBAT:{
        comment:[]
      },
      SONDAGE:{
        vote:[]
      },
      STATUS:{
        code:0,
        message:''
      }
    };

    cookie.getPilier = function () {
      var values_get = $cookies.get('PILIER');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.PILIER[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.PILIER;
    }

    cookie.setPilier = function (type, value) {
      var values = cookie.getPilier();
      if(values[type].length > 0){
        if(values[type].indexOf(value) != -1){
          cookie.STATUS.code = 300;
          cookie.STATUS.message = "Impossible d'effectuer l'action";
          return cookie.STATUS;
        }else{
          var old_content = values[type];
          old_content.push(value);
          var obj = {};
          obj[type] = old_content;
          $cookies.put('PILIER',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }

      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = [];
        obj[type].push(value);
        $cookies.put('PILIER',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    return cookie;


  });
