angular.module('pag-site')
    .directive("commentChart", function() {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            templateUrl: '/admin/views/directives/bar-chart.html',
            link: function(scope, element) {
                scope.labels = ['Nombre de commentaires', 'Nombre total de commentaires'];
                scope.series3 = ['Serie A'];
                scope.chartData = [];

                scope.$watch('data', function() {
                    if(scope.data) {
                        scope.chartData = [scope.data.nbreComment, scope.data.nbreTotalComment];
                    }
                });
            }
        }
    });
