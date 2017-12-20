angular.module('pag-site')
    .directive("debatParPostChart", function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/admin/views/directives/bar-chart.html',
            link: function(scope, element) {
                scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011'];
                scope.series = ['Series A'];

                scope.data = [
                    [65, 59, 80, 81, 56, 55]
                ];
            }
        }
    });
