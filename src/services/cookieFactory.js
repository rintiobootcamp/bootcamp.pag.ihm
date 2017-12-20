angular.module('pag-site')
  .factory('cookieModel', function ($http, API, $cookies) {
    var cookie = {
      USER:{
        peudo:'',
        email:''
      },
      PREFERENCES:{
        sitevisited:false,
      },
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

    // Modèle de PREFERENCES
    cookie.getPreferences = function () {
      var values_get = $cookies.get('PREFERENCES');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.PREFERENCES[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.PREFERENCES;
    }
    cookie.setPreferences = function (type, value) {
      var values = cookie.getPreferences();
      if(values[type] != ''){
        if(values[type] != value){
          var obj = {};
          obj[type] = value;
          $cookies.put('PREFERENCES',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }
      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = value;
        $cookies.put('PREFERENCES',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    // Modèle de USER
    cookie.getUser = function () {
      var values_get = $cookies.get('USER');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.USER[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.USER;
    }
    cookie.setUser = function (type, value) {
      var values = cookie.getUser();
      if(values[type] != ''){
        if(values[type] != value){
          var obj = {};
          obj[type] = value;
          $cookies.put('USER',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }
      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = value;
        $cookies.put('USER',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    // Modèle de Pilier
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

    // Modèle de Axe
    cookie.getAxe = function () {
      var values_get = $cookies.get('AXE');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.AXE[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.AXE;
    }
    cookie.setAxe = function (type, value) {
      var values = cookie.getAxe();
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
          $cookies.put('AXE',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }

      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = [];
        obj[type].push(value);
        $cookies.put('AXE',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    // Modèle de Projet
    cookie.getProjet = function () {
      var values_get = $cookies.get('PROJET');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.PROJET[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.PROJET;
    }
    cookie.setProjet = function (type, value) {
      var values = cookie.getProjet();
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
          $cookies.put('PROJET',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }

      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = [];
        obj[type].push(value);
        $cookies.put('PROJET',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    // Modèle de Débat ( Forum)
    cookie.getDebat = function () {
      var values_get = $cookies.get('DEBAT');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.DEBAT[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.DEBAT;
    }
    cookie.setDebat = function (type, value) {
      var values = cookie.getDebat();
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
          $cookies.put('DEBAT',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }

      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = [];
        obj[type].push(value);
        $cookies.put('DEBAT',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }

    // Modèle de Sondage
    cookie.getSondage = function () {
      var values_get = $cookies.get('SONDAGE');
      if(values_get != undefined ){
        var dataJson = JSON.parse(values_get);
        var array_index = Object.keys(dataJson);
        for(var i = 0; i < array_index.length; i++) {
          cookie.SONDAGE[array_index[i]] =  dataJson[array_index[i]];
        }
      }
      return cookie.SONDAGE;
    }
    cookie.setSondage = function (type, value) {
      var values = cookie.getSondage();
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
          $cookies.put('SONDAGE',JSON.stringify(obj));
          cookie.STATUS.code = 200;
          cookie.STATUS.message = "Action effectuée";
          return cookie.STATUS;
        }

      }else{
        // User never use action need to save in cookie
        var obj = {};
        obj[type] = [];
        obj[type].push(value);
        $cookies.put('SONDAGE',JSON.stringify(obj));
        cookie.STATUS.code = 200;
        cookie.STATUS.message = "Action effectuée";
        return cookie.STATUS;
      }
    }





    return cookie;
  });
