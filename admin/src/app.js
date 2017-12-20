(function() {
        'use strict';
    angular.module('pag-site', [
      "ui.router", "ngResource",
      "ui.select"
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");
          // Now set up the states
        $stateProvider
        // // HOME
        //   .state('home', {
        //       url: "/",
        //       controller: "AdminHomeCtrl",
        //       templateUrl: "views/admin/template.html",
        //       ncyBreadcrumb: {
        //           label: 'Accueil'
        //       }
        //   })
        //   // ADMIN
        //   .state('admin', {
        //       url: '/admin',
        //       abstract: true
        //   })
        // ADMIN
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'views/admin/template.html'
        })
        .state('admin.main', {
            url: '/main',
            controller: "AdminHomeCtrl",
            templateUrl: 'views/admin/home.html',
            ncyBreadcrumb: {
                label: 'Admin'
            }
        })
          .state('admin.piliers', {
              url: '/piliers',
              controller: "AdminPiliersCtrl",
              templateUrl: 'views/admin/piliers/piliers.html',
              ncyBreadcrumb: {
                  label: 'Piliers'
              }
          })
          .state('admin.newpilier', {
              url: '/piliers/new',
              controller: "AdminNewPiliersCtrl",
              templateUrl: 'views/admin/piliers/form.html',
              ncyBreadcrumb: {
                  label: 'Piliersnew'
              }
          })
          .state('admin.axes', {
              url: '/axes',
              controller: "AdminAxesCtrl",
              templateUrl: 'views/admin/axes/axes.html',
              ncyBreadcrumb: {
                  label: 'Axes'
              }
          })
          .state('admin.newaxe', {
              url: '/axes/new',
              controller: "AdminNewAxeCtrl",
              templateUrl: 'views/admin/axes/form.html',
              ncyBreadcrumb: {
                  label: 'Axesnew'
              }
          })
          .state('admin.secteurs', {
              url: '/secteurs',
              controller: "AdminSecteursCtrl",
              templateUrl: 'views/admin/secteurs/secteurs.html',
              ncyBreadcrumb: {
                  label: 'Secteurs'
              }
          })
          .state('admin.newsecteur', {
              url: '/secteurs/new',
              controller: "AdminNewSecteurCtrl",
              templateUrl: 'views/admin/secteurs/form.html',
              ncyBreadcrumb: {
                  label: 'Secteursnew'
              }
          })
          .state('admin.editsecteur', {
              url: '/secteurs/edit/:id',
              controller: "AdminEditSecteurCtrl",
              templateUrl: 'views/admin/secteurs/form.html',
              ncyBreadcrumb: {
                  label: 'Secteursedit'
              }
          })
          .state('admin.projets', {
              url: '/projets',
              controller: "AdminProjetsCtrl",
              templateUrl: 'views/admin/projets/projets.html',
              ncyBreadcrumb: {
                  label: 'Projets'
              }
          })
          .state('admin.newprojet', {
              url: '/projets/new',
              controller: "AdminNewProjetCtrl",
              templateUrl: 'views/admin/projets/form.html',
              ncyBreadcrumb: {
                  label: 'Projetsnew'
              }
          })
          .state('admin.editprojet', {
              url: '/projets/edit/:id',
              controller: "AdminEditProjetCtrl",
              templateUrl: 'views/admin/projets/form.html',
              ncyBreadcrumb: {
                  label: 'Projetsedit'
              }
          })
          .state('admin.pilier', {
              url: "/pilier/:id",
              controller: "SiteOnePilierCtrl",
              templateUrl: "views/admin/piliers/pilier.html",
              ncyBreadcrumb: {
                  label: 'Pilier'
              }
          })
          .state('admin.editpilier', {
              url: '/piliers/edit/:id',
              controller: "AdminEditPilierCtrl",
              templateUrl: 'views/admin/piliers/form.html',
              ncyBreadcrumb: {
                  label: 'Piliersedit'
              }
          })
          .state('admin.axe', {
              url: "/axe/:id",
              controller: "SiteOneAxeCtrl",
              templateUrl: "views/admin/axes/axe.html",
              ncyBreadcrumb: {
                  label: 'Axe'
              }
          })
          .state('admin.editaxe', {
              url: '/axes/edit/:id',
              controller: "AdminEditAxeCtrl",
              templateUrl: 'views/admin/axes/form.html',
              ncyBreadcrumb: {
                  label: 'Axesedit'
              }
          })
          .state('admin.projet', {
              url: "/projet/:id",
              controller: "SiteOneProjetCtrl",
              templateUrl: "views/admin/projets/projet.html",
              ncyBreadcrumb: {
                  label: 'Projet'
              }
          })
          .state('admin.phases', {
              url: '/phases',
              controller: "AdminPhasesCtrl",
              templateUrl: 'views/admin/phases/phases.html',
              ncyBreadcrumb: {
                  label: 'Phases'
              }
          })
          .state('admin.newphase', {
              url: '/phases/new',
              controller: "AdminNewPhasesCtrl",
              templateUrl: 'views/admin/phases/form.html',
              ncyBreadcrumb: {
                  label: 'Phasesnew'
              }
          })
            ; // End stateProvider
          $locationProvider.html5Mode(true);
    });
    })();
