angular.module('pag-site')
.directive("selfSlider", function () {
    return {
        restrict: 'A',
        link: function(scope, element){
            console.log(element);
            element.slider();
        } 
    }
});