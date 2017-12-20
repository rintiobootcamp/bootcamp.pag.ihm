(function() {
    'use strict';
    angular.module('pag-site', [
            "ui.router", "ngResource",
            "ui.select", "chart.js"
        ])
        .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

            $urlRouterProvider.otherwise("/");
            // Now set up the states
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: 'admin/views/admin/template.html'
                })
                .state('admin.main', {
                    url: '/main',
                    controller: "AdminHomeCtrl",
                    templateUrl: 'admin/views/admin/home.html',
                    ncyBreadcrumb: {
                        label: 'Admin'
                    }
                })
                .state('admin.piliers', {
                    url: '/piliers',
                    controller: "AdminPiliersCtrl",
                    templateUrl: 'admin/views/admin/piliers/piliers.html',
                    ncyBreadcrumb: {
                        label: 'Piliers'
                    }
                })
                .state('admin.newpilier', {
                    url: '/piliers/new',
                    controller: "AdminNewPiliersCtrl",
                    templateUrl: 'admin/views/admin/piliers/form.html',
                    ncyBreadcrumb: {
                        label: 'Piliersnew'
                    }
                })
                .state('admin.axes', {
                    url: '/axes',
                    controller: "AdminAxesCtrl",
                    templateUrl: 'admin/views/admin/axes/axes.html',
                    ncyBreadcrumb: {
                        label: 'Axes'
                    }
                })
                .state('admin.newaxe', {
                    url: '/axes/new',
                    controller: "AdminNewAxeCtrl",
                    templateUrl: 'admin/views/admin/axes/form.html',
                    ncyBreadcrumb: {
                        label: 'Axesnew'
                    }
                })
                .state('admin.secteurs', {
                    url: '/secteurs',
                    controller: "AdminSecteursCtrl",
                    templateUrl: 'admin/views/admin/secteurs/secteurs.html',
                    ncyBreadcrumb: {
                        label: 'Secteurs'
                    }
                })
                .state('admin.newsecteur', {
                    url: '/secteurs/new',
                    controller: "AdminNewSecteurCtrl",
                    templateUrl: 'admin/views/admin/secteurs/form.html',
                    ncyBreadcrumb: {
                        label: 'Secteursnew'
                    }
                })
                .state('admin.editsecteur', {
                    url: '/secteurs/edit/:id',
                    controller: "AdminEditSecteurCtrl",
                    templateUrl: 'admin/views/admin/secteurs/form.html',
                    ncyBreadcrumb: {
                        label: 'Secteursedit'
                    }
                })
                .state('admin.projets', {
                    url: '/projets',
                    controller: "AdminProjetsCtrl",
                    templateUrl: 'admin/views/admin/projets/projets.html',
                    ncyBreadcrumb: {
                        label: 'Projets'
                    }
                })
                .state('admin.newprojet', {
                    url: '/projets/new',
                    controller: "AdminNewProjetCtrl",
                    templateUrl: 'admin/views/admin/projets/form.html',
                    ncyBreadcrumb: {
                        label: 'Projetsnew'
                    }
                })
                .state('admin.editprojet', {
                    url: '/projets/edit/:id',
                    controller: "AdminEditProjetCtrl",
                    templateUrl: 'admin/views/admin/projets/form.html',
                    ncyBreadcrumb: {
                        label: 'Projetsedit'
                    }
                })
                .state('admin.pilier', {
                    url: "/pilier/:id",
                    controller: "SiteOnePilierCtrl",
                    templateUrl: "admin/views/admin/piliers/pilier.html",
                    ncyBreadcrumb: {
                        label: 'Pilier'
                    }
                })
                .state('admin.editpilier', {
                    url: '/piliers/edit/:id',
                    controller: "AdminEditPilierCtrl",
                    templateUrl: 'admin/views/admin/piliers/form.html',
                    ncyBreadcrumb: {
                        label: 'Piliersedit'
                    }
                })
                .state('admin.axe', {
                    url: "/axe/:id",
                    controller: "SiteOneAxeCtrl",
                    templateUrl: "admin/views/admin/axes/axe.html",
                    ncyBreadcrumb: {
                        label: 'Axe'
                    }
                })
                .state('admin.editaxe', {
                    url: '/axes/edit/:id',
                    controller: "AdminEditAxeCtrl",
                    templateUrl: 'admin/views/admin/axes/form.html',
                    ncyBreadcrumb: {
                        label: 'Axesedit'
                    }
                })
                .state('admin.projet', {
                    url: "/projet/:id",
                    controller: "SiteOneProjetCtrl",
                    templateUrl: "admin/views/admin/projets/projet.html",
                    ncyBreadcrumb: {
                        label: 'Projet'
                    }
                })
                .state('admin.phases', {
                    url: '/phases',
                    controller: "AdminPhasesCtrl",
                    templateUrl: 'admin/views/admin/phases/phases.html',
                    ncyBreadcrumb: {
                        label: 'Phases'
                    }
                })
                .state('admin.newphase', {
                    url: '/phases/new',
                    controller: "AdminNewPhasesCtrl",
                    templateUrl: 'admin/views/admin/phases/form.html',
                    ncyBreadcrumb: {
                        label: 'Phasesnew'
                    }
                }); // End stateProvider
            $locationProvider.html5Mode(true);
        });
})();
