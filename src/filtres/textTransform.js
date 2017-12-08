angular.module('pag-site')
    .filter('capitalizeFirst', function() {
        return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});