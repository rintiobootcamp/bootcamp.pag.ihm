(function() {
    'use strict';
angular.module('pag-site', [
  "ui.router", 
  "angularMoment",
  "ui.select",
  "ngSanitize",
  "ngCookies",
  "toaster",
  "ngAnimate"
])
.run(function(amMoment, $rootScope) {
    amMoment.changeLocale('fr');
}
)
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/widget/sondage");
      // Now set up the states
    $stateProvider
      .state('sondage', {
            url: '/widget/sondage',
            controller: "WidgetSondageCtrl",
            templateUrl: "/widget/sondage/views/widget.html",
      });
      $locationProvider.html5Mode(true);
});
})();
