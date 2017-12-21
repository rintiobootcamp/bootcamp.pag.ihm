angular.module('pag-site')
    .directive("likeChart", function(ModelProjet, StatProjet) {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            templateUrl: '/admin/views/directives/like-chart.html',
            link: function(scope, element) {
                scope.chartData = [];
                scope.labels = ['Like', 'Unlike'];

                scope.$watch('data', function() {
                    if(scope.data) {
                        scope.chartData = [scope.data.nbreLike, scope.data.nbreUnLike];
                    }
                });
            }
        }
    });
