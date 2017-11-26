(function() {
        'use strict';
    angular.module('pag-site', ["ui.router","ap.controllers", "ap.services"])
      .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
         $urlRouterProvider.otherwise("/home");
          // Now set up the states
          $stateProvider
          // HOME
          .state('home', {
              url: "/",
              controller: "HomeUserCtrl",
              templateUrl: "views/site/home.html"
          })
            ; // End stateProvider
        });
    })();
    