(function() {
        'use strict';
    angular.module('pag-site', ["ui.router","ngResource","ngMaterial","ncy-angular-breadcrumb"])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");
          // Now set up the states
        $stateProvider
          // HOME
            .state('home', {
                url: "/",
                controller: "SiteHomeCtrl",
                templateUrl: "views/site/home/home.html",
                ncyBreadcrumb: {
                    label: 'Accueil'
                }
            })

            .state('piliers', {
                url: "/piliers",
                controller: "SitePiliersCtrl",
                templateUrl: "views/site/piliers/piliers.html",
                ncyBreadcrumb: {
                    label: 'Piliers'
                }
            })

            .state('pilier', {
                url: "/pilier/:id",
                controller: "SiteOnePilierCtrl",
                templateUrl: "views/site/piliers/pilier.html",
                ncyBreadcrumb: {
                    label: 'Pilier'
                }
            })
            .state('axe', {
                url: "/pilier/:idPilier/axe/:idAxe",
                controller: "SiteOnePilierCtrl",
                templateUrl: "views/site/piliers/pilier.html",
                ncyBreadcrumb: {
                    label: 'Pilier'
                }
            })

            ; // End stateProvider
          $locationProvider.html5Mode(true);
    });
    })();
    