
var serviceModule = angular.module("ap.services",[]);

//module des services
serviceModule
.constant("SERVER",
    {
        //url: "https://testplateformebj.org/e-codir-cocab/servicesbackend/public/api/v1/",
        url: "http://localhost/geopal/servicesbackend/public/api/v1/",
        //basefile: "https://testplateformebj.org/e-codir-cocab/servicesbackend/storage/app/"
        basefile: "http://localhost/geopal/servicesbackend/storage/app/"
    }
)

/*
* Factory du Model de l'application
*/
.factory("Model", function(SERVER, $q, $http, $log, Utilitaire, BiblioF, Upload){

	/********************** INITIALISATION DU MODEL  ***********************/
	  	var model = {
		    errorMsg: "",
		    saveStatus: null
		  };



	/********************** LOGIN ***********************/

        model.login = function(obj){
            return $http({
                method: 'POST',
                data: angular.toJson(obj),
                url: SERVER.url + 'auth'
            }).success(function(data){
            	
                model["login_result"] = data;
            })
                .error(function(data){
                    model.errorMsg = "Erreur de réseau";

                });
        }

// *** MODEL DE LA TABLE projet ***
       
          model.getListModule = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'module'
            }).success(function(data){
              model["modules"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListModuleStructure = function(obj){
            return $http({
              method: 'POST',
              url: SERVER.url + 'module/structure',
              data: angular.toJson(obj)
            }).success(function(data){
              model["modules"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListModuleLogin = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'auth/modules'
            }).success(function(data){
              model["modules"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListProfilCodir = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/profils'
            }).success(function(data){
              model["profilscodir"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListProfilCocab = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'cocab/profils'
            }).success(function(data){
              model["profilscocab"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          

// *** MODEL DE LA TABLE structure ***
       
          model.getListStructure = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'structure'
            }).success(function(data){
              model["structures"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getCountStructureTotal = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'structure/total'
            }).success(function(data){
              model["totalstructures"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

        //Enregistrer
          model.saveStructure = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'structure';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.IdStructure ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["structures"] = data;
            })
            .error(function(error){
              
            });
          }

          // Supprimer
          model.dropStructure = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'structure/'+id+add_after,
            }).success(function(data){
              model["structures"] = data;
            })
            .error(function(){

            });
          }

      // *** MODEL DE LA TABLE poste ***
        
      model.getListPoste = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'poste'
        }).success(function(data){
          model["postes"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

    //Enregistrer
      model.savePoste = function(obj){

        //AJOUTER LE id SI C'EST UNE MODIFICATION
        var urlrequete =  SERVER.url + 'poste';
        if(obj.md === 'edit') {
            urlrequete = urlrequete + "/" + obj.IdPoste ;
        }
        
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["postes"] = data;
        })
        .error(function(error){
          
        });
      }

      // Supprimer
      model.dropPoste = function(id,obj){
        var add_after = '';
        if(obj.after_done != undefined) {
          add_after = "?after_done="+obj.after_done;
        }
        return $http({
          method: 'DELETE',
          url: SERVER.url + 'poste/'+id+add_after,
        }).success(function(data){
          model["postes"] = data;
        })
        .error(function(){

        });
      }

      /* Préférences */
      model.getListPreferencesCodir = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/preferences'
        }).success(function(data){
          model["preferences"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getListPreferenceOrdreJourCodir = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/preferences/ordrejour'
        }).success(function(data){
          model["preference"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.savePreferenceOrdreJourCodir = function(obj){
        var urlrequete =  SERVER.url + 'codir/preferences/ordrejour';
          
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["preferences"] = data;
        })
        .error(function(error){
          
        });
      }


          // *** MODEL DE LA TABLE sujets codir ***
       
          model.getListSujetCodir = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet'
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getCountSujetTotal = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/total'
            }).success(function(data){
              model["totalsujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getCountSujetStructTotal = function(id_structure){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/structure/total?IdStructure='+id_structure
            }).success(function(data){
              model["totalsujetsstruct"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSujetOneCodir = function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/inscrit/codir/'+id_codir
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSujetTypeInscritOneCodir = function(id_codir,id_type_sujet){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/type/inscrit/ordrejour/codir?IdCodir='+id_codir+'&IdTypeSujet='+id_type_sujet
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSujetOneCodirOrdreJour = function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/inscrit/ordrejour/codir/'+id_codir
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }
          

          model.getListSujetPropOneCodir =  function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/propose/codir/' + id_codir
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSujetInsComDirection =  function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/inscrit/codir/comitedirection/' + id_codir
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSujetOneCodirStructure = function(id_codir,id_struct){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/inscrit/codir/structure?IdCodir=' + id_codir+'&IdStructure='+id_struct
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListCommentSujetOneCodir = function(id_codir,id_sujet){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/sujet/observation/codir?IdCodir=' + id_codir+'&IdSujet='+id_sujet
            }).success(function(data){
              model["observations"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

        //Enregistrer
          model.saveSujetCodir = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'codir/sujet';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.IdSujet;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              
            });
          }

          model.savePropSujCodir = function(obj){

            var urlrequete =  SERVER.url + 'codir/sujet/proposercodir';
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              
            });
          }

          model.saveInscripSujetCodir = function(obj){            
            var urlrequete =  SERVER.url + 'codir/sujet/inscrirecodir';
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              
            });
          }

          model.saveObservationSujet = function(obj){
            var urlrequete =  SERVER.url + 'codir/sujet/observation';
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              
            });
          }

          // Supprimer
          model.dropSujetCodir = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'codir/sujet/'+id+add_after,
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(){

            });
          }


           // *** MODEL DE LA TABLE sujets cocab ***
       
           model.getListSujetCocab = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'cocab/sujet'
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

        //Enregistrer
          model.saveSujetCocab = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'cocab/sujet';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.IdSujet;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(error){
              
            });
          }

          // Supprimer
          model.dropSujetCocab = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'cocab/sujet/'+id+add_after,
            }).success(function(data){
              model["sujets"] = data;
            })
            .error(function(){

            });
          }

              // *** MODEL DE LA TABLE communications codir ***
              model.getListComCodir = function(){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication'
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            // Liste des communications qui ont été traité
            model.getListComProcessCodir = function(){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/process'
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            model.getCountComInterMinistTotal = function(){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/total'
              }).success(function(data){
                model["totalcominterminist"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            model.getCountComInterMinistAffStructTotal = function(id_structure){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/affecte/structure/total?IdStructure='+id_structure
              }).success(function(data){
                model["totalcominterministaffectes"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            model.getCountComInterMinistAffStructAttenteTotal = function(id_structure){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/affecte/structure/attente/total?IdStructure='+id_structure
              }).success(function(data){
                model["totalcominterministaffectesattente"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }
            
            model.getListComOneCodir = function(id_codir){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/inscrit/codir/' + id_codir
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            model.getListComOneCodirStructure = function(id_codir,id_struct){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/inscrit/codir/structure?IdCodir=' + id_codir+'&IdStructure='+id_struct
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

            model.getListCommentComOneCodir = function(id_codir,id_com){
              return $http({
                method: 'GET',
                url: SERVER.url + 'codir/communication/observation/codir?IdCodir=' + id_codir+'&IdCommunication='+id_com
              }).success(function(data){
                model["observations"] = data;
              })
              .error(function(error){
                model.error = error;
              });
            }

          //Enregistrer
            model.saveComCodir = function(obj){
  
              //AJOUTER LE id SI C'EST UNE MODIFICATION
                var urlrequete =  SERVER.url + 'codir/communication';
              if(obj.md === 'edit') {
                    urlrequete = urlrequete + "/" + obj.IdCommunication;
              }
                
              return $http({
                method: 'POST',
                url: urlrequete,
                data: angular.toJson(obj)
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                
              });
            }

            model.saveInscripComCodir = function(obj){
              
              var urlrequete =  SERVER.url + 'codir/communication/inscrire';
              return $http({
                method: 'POST',
                url: urlrequete,
                data: angular.toJson(obj)
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                
              });
            }

            model.saveObservationCom = function(obj){
              var urlrequete =  SERVER.url + 'codir/communication/observation';
              return $http({
                method: 'POST',
                url: urlrequete,
                data: angular.toJson(obj)
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(error){
                
              });
            }

            model.saveProcessComCodir = function(obj){
              
              //AJOUTER LE id SI C'EST UNE MODIFICATION
              var urlrequete =  SERVER.url + 'codir/communication/process';
              return $http({
                method: 'POST',
                url: urlrequete,
                data: angular.toJson(obj)
              }).success(function(data){
                model["message"] = data;
              })
              .error(function(error){
                
              });
            }
            
  
            // Supprimer
            model.dropComCodir = function(id,obj){
              var add_after = '';
              if(obj.after_done != undefined) {
                add_after = "?after_done="+obj.after_done;
              }
              return $http({
                method: 'DELETE',
                url: SERVER.url + 'codir/communication/'+id+add_after,
              }).success(function(data){
                model["communications"] = data;
              })
              .error(function(){
  
              });
            }

      // *** MODEL DE LA TABLE communications initité par ministere au codir ***
      model.getListComInitMinCodir = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere'
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getCountComInitMinistTotal = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/total'
        }).success(function(data){
          model["totalcominitminist"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getCountComInitMinistStructTotal = function(id_structure){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/structure/total?IdStructure='+id_structure
        }).success(function(data){
          model["totalcominitministstruct"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      // Liste des communications qui ont été traité
      model.getListComInitMinProcessCodir = function(){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/process'
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getListComInitMinistPropOneCodir =  function(id_codir){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/propose/codir/' + id_codir
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }
      
      model.getListComInitMinOneCodir = function(id_codir){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/inscrit/codir/' + id_codir
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getListComInitMinOneCodirStructure = function(id_codir,id_struct){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/inscrit/codir/structure?IdCodir=' + id_codir+'&IdStructure='+id_struct
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getListCommentComInitMinOneCodir = function(id_codir,id_com){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/observation/codir?IdCodir=' + id_codir+'&IdCommunication='+id_com
        }).success(function(data){
          model["observations"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

      model.getListFilesOneComMinist = function(id_com){
        return $http({
          method: 'GET',
          url: SERVER.url + 'codir/communication/initministere/files?IdCommunication='+id_com
        }).success(function(data){
          model["files"] = data;
        })
        .error(function(error){
          model.error = error;
        });
      }

    //Enregistrer
      model.saveComInitMinCodir = function(obj){

        //AJOUTER LE id SI C'EST UNE MODIFICATION
          var urlrequete =  SERVER.url + 'codir/communication/initministere';
        if(obj.md === 'edit') {
              urlrequete = urlrequete + "/" + obj.IdCommunication;
        }
          
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          
        });
      }

      model.savePropComCodir = function(obj){
        var urlrequete =  SERVER.url + 'codir/communication/initministere/proposercodir';
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          
        });
      }

      model.saveInscripComInitMinCodir = function(obj){
        
        var urlrequete =  SERVER.url + 'codir/communication/initministere/inscrire';
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          
        });
      }

      model.saveObservationComInitMin = function(obj){
        var urlrequete =  SERVER.url + 'codir/communication/initministere/observation';
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(error){
          
        });
      }

      model.saveProcessComInitMinCodir = function(obj){
        
        //AJOUTER LE id SI C'EST UNE MODIFICATION
        var urlrequete =  SERVER.url + 'codir/communication/initministere/process';
        return $http({
          method: 'POST',
          url: urlrequete,
          data: angular.toJson(obj)
        }).success(function(data){
          model["message"] = data;
        })
        .error(function(error){
          
        });
      }

      // Supprimer
      model.dropComInitMinCodir = function(id,obj){
        var add_after = '';
        if(obj.after_done != undefined) {
          add_after = "?after_done="+obj.after_done;
        }
        return $http({
          method: 'DELETE',
          url: SERVER.url + 'codir/communication/initministere/'+id+add_after,
        }).success(function(data){
          model["communications"] = data;
        })
        .error(function(){

        });
      }

      // Supprimer
      model.deleteFileComInitMinCodir = function(id,obj){
        var add_after = '';
        if(obj.after_done != undefined) {
          add_after = "?IdCommunication="+obj.IdCommunication+ "&after_done="+obj.after_done;
        }
        return $http({
          method: 'DELETE',
          url: SERVER.url + 'codir/communication/initministere/deletefile/'+id+add_after,
        }).success(function(data){
          model["files"] = data;
        })
        .error(function(){

        });
      }

          // *** MODEL DE LA TABLE communications codir ***

          model.getListCodir = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir'
            }).success(function(data){
              model["codirs"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getCountCodirTotal = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir/total'
            }).success(function(data){
              model["totalcodirs"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListCodirCourant = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir/courant'
            }).success(function(data){
              model["codirs"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          } 

          model.getListCodirOuvert = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir/ouvert'
            }).success(function(data){
              model["codirouvert"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListPresenceCodir = function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir/presence?IdCodir='+id_codir
            }).success(function(data){
              model["presences"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListSignalAbsencesCodir = function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/codir/absence?IdCodir='+id_codir
            }).success(function(data){
              model["signalabsences"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.getListPresenceStandardAttenduCodir = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/presence/attendu'
            }).success(function(data){
              model["structures"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          //Enregistrer
          model.saveListStructureAttendu = function(obj){
            var urlrequete =  SERVER.url + 'codir/codir/structures/attendu/save';
          return $http({
            method: 'POST',
            url: urlrequete,
            data: angular.toJson(obj)
          }).success(function(data){
            model["presences"] = data;
          })
          .error(function(error){
            
          });
        }

          

          //Enregistrer
          model.saveCodir = function(obj){
            //AJOUTER LE id SI C'EST UNE MODIFICATION
              var urlrequete =  SERVER.url + 'codir/codir';
            if(obj.md === 'edit') {
                  urlrequete = urlrequete + "/" + obj.IdCodir;
            }
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["codirs"] = data;
            })
            .error(function(error){
              
            });
          }

          //Enregistrer
          model.saveStartCodir = function(obj){
              var urlrequete =  SERVER.url + 'codir/codir/demarrer';
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["codirs"] = data;
            })
            .error(function(error){
              
            });
          }

           //Enregistrer
           model.saveNewPresenceStructure = function(obj){
             //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'codir/codir/presence/save';
              return $http({
                method: 'POST',
                url: urlrequete,
                data: angular.toJson(obj)
              }).success(function(data){
                model["presences"] = data;
              })
              .error(function(error){
                
              });
            }

            //Enregistrer
           model.savePresenceList = function(obj){
            //AJOUTER LE id SI C'EST UNE MODIFICATION
            var urlrequete =  SERVER.url + 'codir/codir/presence/save_all';
             return $http({
               method: 'POST',
               url: urlrequete,
               data: angular.toJson(obj)
             }).success(function(data){
               model["presences"] = data;
             })
             .error(function(error){
               
             });
           }

           model.getAbsenceCodirRep = function(obj){
            var urlrequete =  SERVER.url + 'codir/codir/absence/get';
             return $http({
               method: 'POST',
               url: urlrequete,
               data: angular.toJson(obj)
             }).success(function(data){
               model["absence"] = data;
             })
             .error(function(error){
               
             });
           }

           model.saveAbsenceRepCodir = function(obj){
            //AJOUTER LE id SI C'EST UNE MODIFICATION
            var urlrequete =  SERVER.url + 'codir/codir/absence/save';
             return $http({
               method: 'POST',
               url: urlrequete,
               data: angular.toJson(obj)
             }).success(function(data){
               model["message"] = data;
             })
             .error(function(error){
               
             });
           }

           model.getListOrdreJourOneCodir = function(id_codir){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/ordrejour/codir/'+id_codir
            }).success(function(data){
              model["ordrejour"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          model.saveOrdreJourOneCodir = function(obj){
            return $http({
              method: 'POST',
              url: SERVER.url + 'codir/ordrejour/codir',
              data:angular.toJson(obj)
            }).success(function(data){
              model["ordrejour"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

          // Supprimer
          model.dropCodir = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'codir/codir/'+id+add_after,
            }).success(function(data){
              model["codirs"] = data;
            })
            .error(function(){

            });
          }


          // *** MODEL DE LA TABLE Type sujet codir ***
       
          model.getListTypeSujetCodir = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'codir/typesujet'
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

        //Enregistrer
          model.saveTypeSujetCodir = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'codir/typesujet';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.IdTypeSujet ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              
            });
          }

          // Supprimer
          model.dropTypeSujetCodir = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            if(obj.current_module_id){
              add_after = add_after + '&current_module_id='+obj.current_module_id;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'codir/typesujet/'+id+add_after,
              data:angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              console.log(error);
            });
          }

          model.getCountTypeSujetCodir = function(obj){
            return $http({
              method: 'POST',
              url: SERVER.url + 'codir/typesujet/total',
              data:angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }


          // *** MODEL DE LA TABLE Type sujet cocab ***
       
          model.getListTypeSujetCocab = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'cocab/typesujet'
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }

        //Enregistrer
          model.saveTypeSujetCocab = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'cocab/typesujet';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.IdTypeSujet ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              
            });
          }

          // Supprimer
          model.dropTypeSujetCocab = function(id,obj){
            var add_after = '';
            if(obj.after_done != undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            if(obj.current_module_id){
              add_after = add_after + '&current_module_id='+obj.current_module_id;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'cocab/typesujet/'+id+add_after,
              data:angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              console.log(error);
            });
          }

          model.getCountTypeSujetCocab = function(obj){
            return $http({
              method: 'POST',
              url: SERVER.url + 'cocab/typesujet/total',
              data:angular.toJson(obj)
            }).success(function(data){
              model["typessujet"] = data;
            })
            .error(function(error){
              model.error = error;
            });
          }



  // *** MODEL DE LA TABLE utilisateurs ***
        //liste des utilisateurs
        model.getListUtilisateur = function(){
          return $http({
            method: 'GET',
            url: SERVER.url + 'utilisateur'
          }).success(function(data){
            model["utilisateurs"] = data;
          })
          .error(function(error){
            model.error = error;
          });
        }

        model.getListUtilisateurFree = function(){
          return $http({
            method: 'GET',
            url: SERVER.url + 'utilisateur/libre'
          }).success(function(data){
            model["utilisateurs"] = data;
          })
          .error(function(error){
            model.error = error;
          });
        }

        //liste des utilisateurs supprimés
        model.getUserDeleteList = function(){
          return $http({
            method: 'GET',
            url: SERVER.url + 'utilisateur/delete'
          }).success(function(data){
            model["utilisateurs_delete"] = data;
          })
          .error(function(){
            model.errorMsg = "Erreur de réseau";
          });
        }


        model.getCountUtilisateurTotal = function (){
            return $http( {
              method:'GET',
              url:SERVER.url + 'utilisateur/total'
            }).success(function (data) {
              model['totalutilisateurs'] = data;
            })
            .error(function(data) {
              model.errorMsg = "Une erreur s'est produite. Réessayez !";
            });
          }

        //Enregistrer un utilisateur
          model.saveUtilisateur = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
            var urlrequete =  SERVER.url + 'utilisateur';
            
            if(obj.IdUtilisateur !="") {
                 urlrequete = urlrequete + "/" + obj.IdUtilisateur ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["utilisateurs"] = data;
            })
            .error(function(data){
            });
          }

        // Supprimer un utilisateur
          model.dropUtilisateur = function(id,obj){
            var add_after = '';
            if(obj.after_done !== undefined) {
              add_after = "?after_done="+obj.after_done;
            }
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'utilisateur/'+id+add_after
            }).success(function(data){
              model["utilisateurs"] = data;
            })
            .error(function(){
            });
          }

        model.saveUpdateProfil = function (obj){
          return $http({
              method: 'POST',
              url: SERVER.url + 'utilisateur/profil/update',
              data: angular.toJson(obj)
            }).success(function(data){
              model["updateprofil"] = data;
            })
            .error(function(data){
             
            });
        }

        // Récupération des infos de l'utilisateur
        model.getUserData = function (){
          return $http( {
            method:'GET',
            url:SERVER.url + 'auth/userdata'
          }).success(function (data) {
            model['userdata'] = data;
          })
          .error(function(error) {
          });
        }


  // *** MODEL DE LA TABLE commune ***
          //liste des communes
          model.getCommuneList = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'commune'
            }).success(function(data){
              model["communes"] = data;

            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Récupérer une commune
          model.getCommune = function(id){
            return $http({
              method: 'GET',
              url: SERVER.url + 'commune/'+id+'/edit'
            }).success(function(data){
              model["commune"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          //Enregistrer une commune
          model.saveCommune = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'commune';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.id ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["communes"] = data;
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Supprimer la structure
          model.dropCommune = function(id){
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'commune/'+id
            }).success(function(data){
              model["communes"] = data;
            })
            .error(function(){
            });
          }




// *** MODEL DE LA TABLE arrondissemnt ***

          //liste des arrondissements
          model.getArrondissementList = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'arrondissement'
            }).success(function(data){
              model["arrondissements"] = data;
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          //liste des arrondissements par commune
          model.getArrondListByCommune = function(idcommune){
            return $http({
              method: 'GET',
              url: SERVER.url + 'arrondissement/commune/'+idcommune
            }).success(function(data){
              model["arrondissements"] = data;
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Récupérer un arrondissemnt
          model.getArrondissement = function(id){
            return $http({
              method: 'GET',
              url: SERVER.url + 'arrondissement/'+id+'/edit'
            }).success(function(data){
              model["arrondissement"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          //Enregistrer un arrondissemnt
          model.saveArrondissement = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'arrondissement';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.id ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["arrondissements"] = data;
              //console.log(data);
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Supprimer l'arrondissement
          model.dropArrondissement = function(id){
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'arrondissement/'+id
            }).success(function(data){
              model["arrondissements"] = data;
            })
            .error(function(){

            });
          }



// *** MODEL DE LA TABLE village ***
          //liste des quartiers ou villages
          model.getQuartVillageList = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'quartiervillage'
            }).success(function(data){
              model["quartiersvillages"] = data;
              //console.log(data);
              //console.log('ok');
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
              //console.log(data);
            });
          }
          //liste des quartiers villages par arrondissement
          model.getQuartVilListByArrond = function(idarrond){
            return $http({
              method: 'GET',
              url: SERVER.url + 'quartiervillage/arrondissement/'+idarrond
            }).success(function(data){
              model["quartvillages"] = data;
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Récupérer un quartier ou village
          model.getQuartVillage = function(id){
            return $http({
              method: 'GET',
              url: SERVER.url + 'quartiervillage/'+id+'/edit'
            }).success(function(data){
              model["quartiervillage"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          //Enregistrer un quartier ou village
          model.saveQuartVillage = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'quartiervillage';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.id ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["quartiersvillages"] = data;
              //console.log(data);
            })
            .error(function(data){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Supprimer le quartier ou village
          model.dropQuartVillage = function(id){
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'quartiervillage/'+id
            }).success(function(data){
              model["quartiersvillages"] = data;
            })
            .error(function(){

            });
          }



   // *** MODEL DE LA TABLE profils ***
          //liste des profils
          model.getListProfil = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'profil'
            }).success(function(data){
              model["profils"] = data;
            })
            .error(function(data){
            });
          }


          // Récupérer un profil
          model.getProfil = function(id){
            return $http({
              method: 'GET',
              url: SERVER.url + 'profil/'+id+'/edit'
            }).success(function(data){
              model["profils"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          //Enregistrer un profil
          model.saveProfil = function(obj){

            //AJOUTER LE id SI C'EST UNE MODIFICATION
             var urlrequete =  SERVER.url + 'profil';
            if(obj.md === 'edit') {
                 urlrequete = urlrequete + "/" + obj.id ;
            }
             
            return $http({
              method: 'POST',
              url: urlrequete,
              data: angular.toJson(obj)
            }).success(function(data){
              model["profils"] = data;
              //console.log(data);
            })
            .error(function(data){
              
            });
          }

          // Supprimer le sprofil
          model.dropProfil = function(id){
            return $http({
              method: 'DELETE',
              url: SERVER.url + 'profil/'+id
            }).success(function(data){
              model["profils"] = data;
            })
            .error(function(){
              //model.errorMsg = "Erreur de réseau";
              //console.log(data);
            });
          }

          // Menage
          model.getDetailsMenage = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'menage/details',
              data: params
            }).success(function(data){
              model["detailsmenage"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

           model.getInfosMenage = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'menage/getinfos',
              data: params
            }).success(function(data){
              model["infosmenage"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.saveInfosMenage = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'menage/saveinfos',
              data: params
            }).success(function(data){
              model["callback"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Liste des TMICS
          model.getListTmics = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'tmic'
            }).success(function(data){
              model["tmics"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Liste des documents du projet
          model.getListDocsProjet = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'docsprojet',
              data: params
            }).success(function(data){
              model["docs"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          /* Exportations */
           model.exportListeBrute = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistebrute/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistebrute/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.exportListeClassif = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlisteclassifiee/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlisteclassifiee/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.exportListeValid = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistevalidee/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistevalidee/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.exportListePaieIncondit = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepaieincondit/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepaieincondit/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.exportListePaieCondit = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepaiecondit/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepaiecondit/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.exportListeParticpTmic = function(params){
             var setHeaders = {};
             if(params.format ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepartictmic/export',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'consultlistepartictmic/export',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          // STATISTIQUES
           // Stastiques globales sur les ménages
          model.getTotalStatDepartHome = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/departements/totalhome',
              data: params
            }).success(function(data){
              model["totalhome"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Données du graph
          model.getDataChartStatDepartHome = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/departements/chartdata',
              data: params
            }).success(function(data){
              model["chartdata"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          // Données du graph
          model.getDataChartStatCommuneHome = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/departement/chartdata',
              data: params
            }).success(function(data){
              model["chartdata"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.getDataChartStatCommunesHome = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/communes/chartdata',
              data: params
            }).success(function(data){
              model["chartdata"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }
          

          model.getDataChartStatVillageHome = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/departement/commune/chartdata',
              data: params
            }).success(function(data){
              model["chartdata"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

            // Liste des attributes de stat
            model.getListStatAttrib = function(){
            return $http({
              method: 'GET',
              url: SERVER.url + 'statattrib'
            }).success(function(data){
              model["statattrib"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.getStatMultiCritere = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/multicritere',
              data:angular.toJson(params)
            }).success(function(data){
              model["statdatas"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.exportStatMultiCritere = function(params){
             var setHeaders = {};
             if(params.export ==='excel') {
                setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
                 return  $http({
                    method: 'POST',
                    url: SERVER.url + 'statistique/multicritere',
                    dataType: 'json',
                    data:$.param(params),
                    responseType: 'arraybuffer',
                    headers: setHeaders
                  }).success(function (data) {
                    model["fileexport"] = data;
                  }).error(function (error) {
                    console.info(error);
                  });
              }else {
                // PDF
                  return  $http({
                    method: 'POST',
                    url: SERVER.url + 'statistique/multicritere',
                    data:angular.toJson(params),
                    responseType: 'arraybuffer'
                    }).success(function (data) {
                      model["fileexport"] = data;
                    }).error(function (error) {
                      console.info(error);
                  });
             }
            
          }

          model.getStatPayIncondit = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/paiement/inconditionnel',
              data:angular.toJson(params)
            }).success(function(data){
              model["statdatas"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.getStatPayCondit = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'statistique/paiement/conditionnel',
              data:angular.toJson(params)
            }).success(function(data){
              model["statdatas"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.CalculScorePmt = function(params){
            return $http({
              method: 'POST',
              url: SERVER.url + 'traitement/calculscorepmt',
              data:angular.toJson(params)
            }).success(function(data){
              model["results"] = data;
            })
            .error(function(){
              model.errorMsg = "Erreur de réseau";
            });
          }

          model.GenererListeExcel = function(params) {
                return  $http({
                  method: 'POST',
                  url: SERVER.url + 'traitement/genererlisteexcel',
                  dataType: 'json',
                  data:angular.toJson(params),
                  responseType: 'arraybuffer'
                }).success(function (data) {
                  model["fileexport"] = data;
                }).error(function (error) {
                  console.info(error);
                });
          }

          model.GenererCartes = function(params) {
                return  $http({
                  method: 'POST',
                  url: SERVER.url + 'traitement/generercartes',
                  dataType: 'json',
                  data:angular.toJson(params),
                  responseType: 'arraybuffer'
                }).success(function (data) {
                  model["fileexport"] = data;
                }).error(function (error) {
                  console.info(error);
                });
          }
          

          
     

    /********************** RETURN OF THE MODEL ***********************/
    	return model;
})


.factory('authenticationInterceptor',
    ['$q', '$location', function($q, $location) {
        return {
            responseError: function(rejection) {
                if (rejection.status == 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            },
            responseSucces: function(rejection) {
                //if (rejection.status == 401) {
                //    $location.path('/login');
                //}
                //return $q.reject(rejection);
            }
        };
}])

//for file upload
.factory('fileUpload',  function ($http, $log) {
  var Upload = {};
  Upload.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    $log.debug(fd);
    fd.append('file', file);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(){
    })
    .error(function(){
    });
  }
  return Upload;
});