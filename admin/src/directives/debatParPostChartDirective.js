angular.module('pag-site')
    .directive("debatParPostChart", function() {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            templateUrl: '/admin/views/directives/bar-chart.html',
            link: function(scope, element) {
                scope.labels = ['Nombre Débats', 'Nombre total Débats'];
                scope.chartData = [];

                scope.$watch('data', function() {
                    if(scope.data) {
                        scope.chartData = [scope.data.nbreDebat, scope.data.nbreTotalDebat];
                    }
                });
            }
        }
    });
