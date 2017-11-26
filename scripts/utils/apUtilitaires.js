

var serviceModule = angular.module("ap.services");

//module des services
serviceModule

    //service BiblioF
 .factory("BiblioF", function(SERVER, $http, $log, $rootScope, $window ){
        var biblio = {

        };
        //formate une date de sa forme povenant de la db en date lisible en francais: format entre: yyyy-mm-dd
        biblio.formatStringDate = function(dateString){
            if (dateString === null || dateString === undefined ) return dateString;

            var theDate = new Date(dateString.substr(0,4), parseInt(dateString.substr(5,2))-1, dateString.substr(8,2),
                dateString.substr(11,2), dateString.substr(14,2), dateString.substr(17,2));
            return theDate;
        }

        //formate une date de sa forme povenant de la db en date lisible en francais: format entre: dd/mm/yyyy
        biblio.formatStringFrDate = function(dateString){
            if (dateString === null || dateString === undefined ) return dateString;

            var theDate = new Date(dateString.substr(6,4), parseInt(dateString.substr(3,2))-1, dateString.substr(0,2),
                23, 59, 0);
            return theDate;
        }

        //convertit une date en chaine de caracteres
        biblio.convertDateToStringLong = function(date){
            if (date === null || date === undefined) return null;
            var momDate = moment(date).format();
            var result = momDate.substring(0, 10) + " " + momDate.substring(11, 19);
            return result;
        }

        //convertit une date en chaine de caracteres
        biblio.convertDateToStringShort = function(date){
            if (date === null || date === undefined) return null;
            var momDate = moment(date).format();
            var result = momDate.substr(8, 2) + "/" + momDate.substr(5, 2) + "/" + momDate.substr(0, 4);
            return result;
        }

        //verifie que le fichier est au format pdf
        biblio.checkPdfFormat = function(pieceFormat){
            if (pieceFormat === null || pieceFormat === undefined || pieceFormat.length<3) return false;
            var regexFormat = /^.*([pdf])$/;  //|[gif]|[png]|[jpeg]|[jpg]
            if (!regexFormat.test(pieceFormat.toLowerCase())){
                return false;
            };
            return true;
        }//fin checkPdfFormat

        //show mesage
        biblio.showMessage = function(msg){
            alert(msg);
        }

        //coder en base 64 le mot de passe
        biblio.encode = function(p){
            return p.to

        }//fin encode

        //get user name
        biblio.get = function(p){
            return p.to

        }//fin encode

        //verifie i une piece est au format pdf, png, jpg, jpeg ou gif ou doc ou docx
        biblio.checkPieceFormat = function(pieceFormat){
            if (pieceFormat === null || pieceFormat === undefined || pieceFormat.length<3) return false;
            var regexFormat = /^.*([pdf]|[gif]|[png]|[jpeg]|[jpg]|[doc]|[docx]|[mp3]|[mp4]|[mpeg]|[avi]|[flv]|[mkv])$/;
            if (!regexFormat.test(pieceFormat.toLowerCase())){
                return false;
            };
            return true;
        }

        return biblio;
    })

//service utilitaire
.factory("Utilitaire", function(SERVER, $http, $log, $rootScope, $window ){
  var Utils = {
    errorMsg: ""
  };

    //utilise pr la pagination
        Utils.broadCastTransChangeTotItems = function (items) {
            //$rootScope.$broadcast("trans_change_size_change");
            Utils["APP_GEOP_FILTERED_LIST"] = items;
        }

      //formate une date objet js en date sous forme chaine de caracteres "dd/MM/yyyy"
      Utils.formatDate = function(myDate){
        var result = myDate.getDate()+ "/"+ (myDate.getMonth()+1) + "/" + myDate.getFullYear()
        return result;
      }

      // Conversion string to int
       Utils.convertToInt = function (id){
            return parseInt(id, 10);
        }

    
    // ***  ** Gestion session de l'utilisateur connecté ** *** //
        Utils.saveUser = function(obj){
            Utils.saveToSession("APP_GEOP", obj);
        };
        
        Utils.getUser = function(){
            return Utils.readFromSession("APP_GEOP");
        };

        Utils.DelUser = function(){
            return Utils.ResetSession("APP_GEOP");
        };

        Utils.ControllerUserConnect = function(){

            try{
                var TheUserConnect = Utils.getUser();
                if(TheUserConnect === null || 
                    typeof TheUserConnect === undefined ||  TheUserConnect.length === 0 )
                    return null;
                else return TheUserConnect;
            }catch(e){
                return null;
            }

        }

    // ***  ** Gestion des utilisateurs ** *** //
        //enregistre un utilisateur
        Utils.saveUtilisateur = function(obj){
            Utils.save("APP_GEOP_UTILISATEUR", obj);
        };

        //Récupère un utilisateur
         Utils.getUtilisateur = function(){
            return Utils.read("APP_GEOP_UTILISATEUR");
        };

        //Récupère un utilisateur
         Utils.getUtilisateur = function(){
            return Utils.read("APP_GEOP_UTILISATEUR");
        };


     // ***  ** Gestion enregistrement en local ** *** //
        Utils.save = function(key, value){
        var jsonValue = angular.toJson(value);
        $window.localStorage.setItem(key, jsonValue);
        };

        Utils.read = function(key){
        var json = $window.localStorage.getItem(key);
        return angular.fromJson(json);
        };


    // ***  ** Gestion des opérations de session ** *** //
        Utils.saveToSession = function(key, value){
            var stringified = angular.toJson(value);
            var jsonValue = btoa(stringified);
            $window.sessionStorage.setItem(key, jsonValue);
        };

        Utils.readFromSession = function(key){
            var result = null;
            try{
                var json = $window.sessionStorage.getItem(key);
                var result = angular.fromJson(atob(json));
            }catch(e){
                result = null;
            }
            return result;
        };

        Utils.ResetSession = function(key){
            var result = null;
            try{
                $window.sessionStorage.removeItem(key);
                result = true;
            }catch(e){
                result = null;
            }
            return result;
        };

  return Utils;
})







