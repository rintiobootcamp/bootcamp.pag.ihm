angular.module('pag-site')
    .directive("likeChart", function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/admin/views/directives/like-chart.html',
            link: function(scope, element) {
                scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                scope.data = [300, 500, 100];
            }
        }
    });
