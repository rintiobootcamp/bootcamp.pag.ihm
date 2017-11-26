

var app = angular.module("ap.customFilters");

	app.directive('awDatepickerPattern',function() {
		  return {
		    restrict: 'A',
		    require: 'ngModel',
		    link: function(scope,elem,attrs,ngModelCtrl) {
		      var dRegex = new RegExp(attrs.awDatepickerPattern);

		      ngModelCtrl.$parsers.unshift(function(value) {

		        if (typeof value === 'string') {
		          var isValid = dRegex.test(value);
		          ngModelCtrl.$setValidity('date',isValid);
		          if (!isValid) {
		            return undefined;
		          }
		        }

		        return value;
		      });

		    }
		  };
	});

	app.directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;

	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);

	app.directive('showLoading',function(){

		return {
				restrict: 'E',
        		replace:true,
				template: '<img src="images/ajax-loader.gif" height="20" />',
				link: function (scope, element, attr) {
	              scope.$watch('inProcess', function (val) {
	                  if (val)
	                      $(element).show();
	                  else
	                      $(element).hide();
	              });
        		}
			
		}

	});

	app.directive("dirMyValidDate", function () {  
    	return {
    		restrict:"A", // Atribut
    		require: "ngModel", // ng-model obligatoire sur la balise
    		link: function (scope, elem, attr, ctrl) {

           		ctrl.$validators.bzValidDate = function(value) {
			        if (value === undefined || value === null || value === "") {
			            return true;
			        }

			        return moment(value, ["D-M-YYYY"], true).isValid();
			    }
        	}
    	}
	});

	app.directive("dirMyValidDateReq", function () {  
    	return {
    		restrict:"A", // Atribut
    		require: "ngModel", // ng-model obligatoire sur la balise
    		link: function (scope, elem, attr, ctrl) {

           		ctrl.$validators.bzValidDate = function(value) {
			        if (value === undefined || value === null || value === "") {
			            return false;
			        }

			        return moment(value, ["D-M-YYYY"], true).isValid();
			    }
        	}
    	}
	});

	app.directive("myDate", function ($filter,$scope) {
		return {
			restrict: 'EAC',
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel) {
				return $filter('date')($scope.dt, 'MM/dd/yyyy');
			}
			}
  });

  app.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

app.directive('uiSelectRequired', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
             ctrl.$validators.uiSelectRequired = function( modelValue, viewValue ) {
				var enabled = !_.isEmpty( modelValue ); // returns false for either {} or [], also for booleans
				return enabled;
			};
        }
    };
});
	
