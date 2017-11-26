(function() {
        'use strict';
    angular.module('pag-site', ["ui.router","ap.controllers", "ap.services","ngMaterial"])
      .config(function ($stateProvider, $urlRouterProvider, $httpProvider,$authProvider) {
    
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = 'http://localhost/geopal/servicesbackend/public/api/v1/auth';
    
          // For any unmatched url, redirect to /login
         $urlRouterProvider.otherwise("/home");
    
          // Now set up the states
          $stateProvider
          // HOME
          .state('home', {
              url: "/",
              controller: "HomeUserCtrl",
              templateUrl: "views/user/login.html"
          })
    ; // End stateProvider
    
        });
    
    })();
    