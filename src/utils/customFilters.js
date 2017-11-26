
angular.module("ap.customFilters",[])

	.filter("range", function ($filter) {
	    return function (data, page, size) {
	        if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
	            var start_index = (page - 1) * size;
	            if (data.length < start_index) {
	                return [];
	            } else {
	                var result = $filter("limitTo")(data.splice(start_index), size);
	                return result;
	            }
	        } else {
	            return data;
	        }
	    }
	})

	.filter("pageCount", function () {
	    return function (data, size) {
	        if (angular.isArray(data)) {
	            var result = [];
	            for (var i = 0; i < Math.ceil(data.length / size); i++) {
	                result.push(i);
	            }
	            return result;
	        } else {
	            return data;
	        }
	    }
	})
        
    //la valeur absolue dun nombre
    .filter("absVal", function () {
            return function (data) {
                var result = Math.abs(data);
                // Math.ceil(data.length / size)                 
                return result;
        }
    }) 

    //limitation de la longueur dun nombre
    .filter("myLimitTo", function ($filter) {
        return function (aNumber, len) {
            var strLen = new String(aNumber).length;   
            if (strLen < len) return aNumber;            
            return $filter("limitTo")(aNumber, len);
        }
    }) 

    //filtre pr limiter le nombre delement afficher sur une page, ds le cadre dune pagination
    .filter("rangeCustom", function (Utilitaire) { 
        return function (data, page, size) {
            var result = [];

        //used to keep data filtered list: used for sum, tm, cvalue ... etc
        Utilitaire.broadCastTransChangeTotItems(data);

            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    var dataCopy = [];
                    for (var i = 0; i < data.length ; i++) {
                        if ( (i >= start_index) && (i <= start_index+size-1) ){
                            dataCopy.push(data[i]);
                        }
                    }
                    result = dataCopy;
                }
                return result;
            } else {
                return data;
            }
        }
    })

	//filtre pour les separateurs de milliers
	.filter('formatMoney', function() {
	  return function(input) {
	    var moneyFormatted = ""; var moneyLength = 0;

	    //controle de al avleur entrée
	    if (input === null || input == undefined) return input;

	    //sa longueur
	    moneyLength = input.length;

	    //inverser la chaine de caractere
	    var copiedInput = new String(angular.copy(input));
	    var inversedInput = copiedInput.split('').reverse().join('');

	    //diviser en groupes de 3
	    for (var i =0; i<(inversedInput.length/3); i++){
	     moneyFormatted += " " + inversedInput.substring(i*3, i*3+3);
	 	}

	    //reinverse
	    var copiedFormated = new String(angular.copy(moneyFormatted));
	    var inversedFormated = copiedFormated.split('').reverse().join('');

	    return inversedFormated;

	}
})

	.filter('moment', function() {
		return function(input, format) {
		format = format || 'll';
		return moment(input).format(format);
		}
	})

	.filter('momentDH', function() {
		return function(input, format) {
		format = format || 'lll';
		return moment(input).format(format);
		}
	})
;