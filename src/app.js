(function() {
        'use strict';
    angular.module('pag-site', ["ui.router","ngResource"])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");
          // Now set up the states
        $stateProvider
          // HOME
            .state('home', {
                url: "/",
                controller: "SiteHomeCtrl",
                templateUrl: "views/site/home.html"
            })

            .state('piliers', {
                url: "/piliers",
                controller: "SitePiliersCtrl",
                templateUrl: "views/site/piliers.html"
            })

            .state('pilier', {
                url: "/pilier",
                controller: "SitePilierCtrl",
                templateUrl: "views/site/pilier.html"
            })

            ; // End stateProvider
          $locationProvider.html5Mode(true);
    });
    })();
    