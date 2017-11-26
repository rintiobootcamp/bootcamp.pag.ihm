var ctrl = angular.module("ap.controllers",[]);

var server_urlcheckauth = 'servicesbackend/public/api/v1/auth';
var server_url = 'servicesbackend/public/api/v1/';

ctrl.controller("HeaderCtrl", function ($auth,$http,$filter,$scope, $rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state, $interval) {

    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

    var getListModuleStructure = function () {
        if($rootScope.UserConnected === undefined)
            $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        var params = {
            IdStructure: $rootScope.UserConnected.IdStructure
        }
        Model.getListModuleStructure(params)
            .then(function () {
                $rootScope.modulesStructure = Model.modules;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
    }
    getListModuleStructure(); 

    //Déconnexion de l'utilisateur
    $scope.disconnect = function(){

        //Enregistrer le log de la decosnnexion
       $http.post(server_urlcheckauth+'/logout').success(function() {
                $auth.logout();
                $rootScope.UserConnected = null;
                Utilitaire.DelUser();
                $state.go("login");
            }).error(function(error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        
    }

    // Afficher le profil de l'utilisateur
    $scope.showProfileWelcome = function(){
        $('#ProfilUserModal').modal('show');
    }

    // Afficher le profil de l'utilisateur
    $scope.showProfileApp = function(){
        $state.go("app.parametres.utilisateurs.profil");
    }

})//fin HeaderCtrl


ctrl.controller("LoginCtrl", function ($http,$auth,$scope, $filter,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state) {

    var getListModule = function () {
        
        Model.getListModuleLogin()
            .then(function () {
                $scope.modules = Model.modules;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
    }

    $scope.loginForm = {
        email: "", password: "", error:"",
        submit:false,conButtonText:"Connexion"
    };

    getListModule();
           
    $rootScope.UserConnected = null;

    if($rootScope.loginFormScope) {
        $scope.loginForm.error = $rootScope.loginFormScope.error;
    }
    else {
        $rootScope.loginFormScope = {error:''};
    }

    $scope.resetError = function () {
        $scope.loginForm.error = "";
    }
    //methode de connexion
    $scope.connexion = function(){
     $scope.loginForm.submit = true;
     $scope.loginForm.conButtonText = "Authentification...";
     $scope.loginForm.error = "";
      if ($scope.loginForm.email === null || $scope.loginForm.email === undefined || $scope.loginForm.email === "" || $scope.loginForm.password === null || $scope.loginForm.password === undefined || $scope.loginForm.password === "" )
      { 
          $scope.loginForm.error = "Email et mot de passe obligatoires";
           return; 
      }

     var credentials = {Email: $scope.loginForm.email,
     password: $scope.loginForm.password,current_module_id:$scope.loginForm.module.IdModule};

      // Use Satellizer's $auth service to login
      // Method used is POST
      $auth.login(credentials).then(function(data) {
        
                // Récupération des infos de l'utilisateur
                $http.get(server_urlcheckauth+'/userdata').success(function(users) {

                    users.current_module_id = credentials.current_module_id;
                    users.current_module = $filter('filter')($scope.modules, {'IdModule': Utilitaire.convertToInt(credentials.current_module_id)},true)[0];
                    Utilitaire.saveUser(users);
                    $rootScope.UserConnected = users;

                    $scope.loginForm.error = "Authentification réussite...";

                    $scope.loginForm.conButtonText = "Patientez...";
                    
                    if(credentials.current_module_id === 1){
                        $state.go('app.codir.accueil');
                    }

                    if(credentials.current_module_id === 2){
                        $state.go('app.cocab.accueil');
                    }
     
                }).error(function(error) {
                  $scope.loginForm.error = 'Un problème est survenue. Veuillez vous reconnecter !';
                  $scope.loginForm.submit = false;                  
                  $scope.loginForm.conButtonText = "Connexion";                  
                });

      }, function(error){
          $scope.loginForm.error = 'Un problème est survenue. Veuillez vous reconnecter !';
          $scope.loginForm.submit = false;
          $scope.loginForm.conButtonText = "Connexion";
      });
  } 

})//fin loginctrl

//
ctrl.controller("MenuCtrl", function ($http,$scope, $rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state) {

          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
            else {
                //if(!$rootScope.showmenu) {
                    $rootScope.showmenu = {};

                    switch ($rootScope.UserConnected.current_module_id) {

                        case 1: // MODULE CODIR

                            switch ($rootScope.UserConnected.ProfilCodir) {
                                case 1: // Super administrateur
                                    $rootScope.showmenu.isSuperAdminCodir = true;
                                    // ACCUEIL
                                    $rootScope.showmenu.MenuAccueilCodir= true;
                                
                                    // PARAMETRES
                                    $rootScope.showmenu.MenuParams= true;
                                    $rootScope.showmenu.MenuTypeSujetCodir = true;
                                    $rootScope.showmenu.MenuPreferencesCodir = true;

                                    // SUJETS
                                    $rootScope.showmenu.MenuSujetCodir= true;
                                    $rootScope.showmenu.MenuSujetCodirListe = true;
                                    $rootScope.showmenu.MenuSujetCodirAjouter = true;

                                    // COMMUNICATION CODIR
                                    $rootScope.showmenu.MenuComCodir = true;
                                    $rootScope.showmenu.MenuComCodirListe = true;
                                    $rootScope.showmenu.MenuComCodirAjouter = true;
                                    $rootScope.showmenu.MenuComCodirMinistereListe = true;

                                    // CODIRS
                                    $rootScope.showmenu.MenuCodir = true;
                                    $rootScope.showmenu.MenuCodirListe = true;
                                    $rootScope.showmenu.MenuCodirAjouter = true;
                                    $rootScope.showmenu.MenuManageCodirCourant = true;
                                    $rootScope.showmenu.MenuModifyOrdreJourCodir = true;

                                    break;

                                case 2: // Administrateur
                                    $rootScope.showmenu.isAdminCodir = true;
                                    // ACCUEIL
                                    $rootScope.showmenu.MenuAccueilCodir= true;
                                
                                    // PARAMETRES
                                    $rootScope.showmenu.MenuParams= true;
                                    $rootScope.showmenu.MenuTypeSujetCodir = true;
                                    $rootScope.showmenu.MenuPreferencesCodir = true;

                                    // SUJETS
                                    $rootScope.showmenu.MenuSujetCodir= true;
                                    $rootScope.showmenu.MenuSujetCodirListe = true;
                                    $rootScope.showmenu.MenuSujetCodirAjouter = true;

                                    // COMMUNICATION CODIR
                                    $rootScope.showmenu.MenuComCodir = true;
                                    $rootScope.showmenu.MenuComCodirListe = true;
                                    $rootScope.showmenu.MenuComCodirAjouter = true;
                                    $rootScope.showmenu.MenuComCodirMinistereListe = true;

                                    // CODIRS
                                    $rootScope.showmenu.MenuCodir = true;
                                    $rootScope.showmenu.MenuCodirListe = true;
                                    $rootScope.showmenu.MenuCodirAjouter = true;
                                    $rootScope.showmenu.MenuManageCodirCourant = true;
                                    $rootScope.showmenu.MenuModifyOrdreJourCodir = true;
                                    break;

                                case 3: // Membre cabinet
                                    $rootScope.showmenu.isMembreCabinetCodir = true;
                                    // ACCUEIL
                                    $rootScope.showmenu.MenuAccueilCodir= true;

                                    // PARAMETRES
                                    $rootScope.showmenu.MenuParams= true;
                                    $rootScope.showmenu.MenuTypeSujetCodir = true;
                                    $rootScope.showmenu.MenuPreferencesCodir = true;

                                    // SUJETS
                                    $rootScope.showmenu.MenuSujetCodir= true;
                                    $rootScope.showmenu.MenuSujetCodirListe = true;
                                    $rootScope.showmenu.MenuSujetCodirAjouter = true;
                                    $rootScope.showmenu.MenuSujetCodirRegisterSelf = true;

                                    // COMMUNICATION CODIR
                                    $rootScope.showmenu.MenuComCodir = true;
                                    $rootScope.showmenu.MenuComCodirListe = true;
                                    $rootScope.showmenu.MenuComCodirAjouter = true;
                                    $rootScope.showmenu.MenuComCodirMinistereListe = true;

                                    // CODIRS
                                    $rootScope.showmenu.MenuCodir = true;
                                    $rootScope.showmenu.MenuCodirListe = true;
                                    $rootScope.showmenu.MenuCodirAjouter = true;
                                    $rootScope.showmenu.MenuManageCodirCourant = true;
                                    $rootScope.showmenu.MenuModifyOrdreJourCodir = true;
                                    break;
                                
                                case 4: // Représentant structure
                                    $rootScope.showmenu.isRepDirectCodir = true;
                                    // ACCUEIL
                                    $rootScope.showmenu.MenuAccueilCodir= true;

                                    // COMMUNICATION CODIR
                                    $rootScope.showmenu.MenuComCodir = true;
                                    $rootScope.showmenu.MenuComCodirListe = true;
                                    $rootScope.showmenu.MenuComCodirTraiteCom = true;
                                    $rootScope.showmenu.MenuComCodirMinistereListe = true;
                                    $rootScope.showmenu.MenuComCodirMinistereAjouter = true;

                                    // SUJETS
                                    $rootScope.showmenu.MenuSujetCodir= true;
                                    $rootScope.showmenu.MenuSujetCodirListe = true;
                                    $rootScope.showmenu.MenuSujetCodirAjouter = true;

                                    // CODIRS
                                    $rootScope.showmenu.MenuCodir = true;
                                    $rootScope.showmenu.MenuCodirListe = true;
                                    $rootScope.showmenu.MenuCodirComment = true;
                                    $rootScope.showmenu.MenuCodirCommentOnly = true;
                                    $rootScope.showmenu.MenuModifyOrdreJourCodir = false;
                                    break;

                                case 5: // Secrétariat Général
                                    $rootScope.showmenu.isSecretGeneralCodir = true;
                                    // ACCUEIL
                                    $rootScope.showmenu.MenuAccueilCodir= true;

                                    // PARAMETRES
                                    $rootScope.showmenu.MenuParams= true;
                                    $rootScope.showmenu.MenuTypeSujetCodir = true;
                                    $rootScope.showmenu.MenuPreferencesCodir = true;

                                    // SUJETS
                                    $rootScope.showmenu.MenuSujetCodir= true;
                                    $rootScope.showmenu.MenuSujetCodirListe = true;
                                    $rootScope.showmenu.MenuSujetCodirAjouter = true;
                                    $rootScope.showmenu.MenuSujetCodirRegisterSelf = true;

                                    // COMMUNICATION CODIR
                                    $rootScope.showmenu.MenuComCodir = true;
                                    $rootScope.showmenu.MenuComCodirListe = true;
                                    $rootScope.showmenu.MenuComCodirAjouter = true;
                                    $rootScope.showmenu.MenuComCodirMinistereListe = true;

                                     // CODIRS
                                     $rootScope.showmenu.MenuCodir = true;
                                     $rootScope.showmenu.MenuCodirListe = true;
                                     $rootScope.showmenu.MenuCodirAjouter = true;
                                     $rootScope.showmenu.MenuManageCodirCourant = true;
                                     $rootScope.showmenu.MenuModifyOrdreJourCodir = true;
                                    break;
                            
                                default:
                                    $rootScope.loginFormScope.error = "Problème lié à votre profil. Contactez l'administrateur";
                                    $state.go('login');
                                    break;
                            }

                            break;

                        case 2: // COCAB
                                switch ($rootScope.UserConnected.ProfilCocab) {
                                    case 1: // Super administrateur
                                        // ACCUEIL
                                        $rootScope.showmenu.MenuAccueilCocab= true;
                                    
                                        // PARAMETRES
                                        $rootScope.showmenu.MenuParams= true;
                                        $rootScope.showmenu.MenuTypeSujetCocab = true;

                                        // SUJETS
                                        $rootScope.showmenu.MenuSujetCocab= true;
                                        $rootScope.showmenu.MenuSujetCocabListe = true;

                                        // CODIRS
                                        $rootScope.showmenu.MenuCodir = true;
                                        $rootScope.showmenu.MenuCodirListe = true;
                                        $rootScope.showmenu.MenuCodirCodirAjouter = true;
                                        break;

                                    case 2: // Administrateur
                                        // ACCUEIL
                                        $rootScope.showmenu.MenuAccueilCocab= true;
                                    
                                        // PARAMETRES
                                        $rootScope.showmenu.MenuParams= true;
                                        $rootScope.showmenu.MenuTypeSujetCocab = true;

                                        // SUJETS
                                        $rootScope.showmenu.MenuSujetCocab= true;
                                        $rootScope.showmenu.MenuSujetCocabListe = true;

                                        // CODIRS
                                        $rootScope.showmenu.MenuCodir = true;
                                        $rootScope.showmenu.MenuCodirListe = true;
                                        $rootScope.showmenu.MenuCodirCodirAjouter = true;
                                        break;

                                    case 3: // Membre cabinet
                                        // ACCUEIL
                                        $rootScope.showmenu.MenuAccueilCocab= true;
                                    
                                        // SUJETS
                                        $rootScope.showmenu.MenuSujetCocab= true;
                                        $rootScope.showmenu.MenuSujetCocabListe = true;
                                        $rootScope.showmenu.MenuSujetCocabAjouter = true;
                                        break;
                                    
                                    case 4: // Représentant structure
                                        // ACCUEIL
                                        $rootScope.showmenu.MenuAccueilCocab= true;

                                        // SUJETS
                                        $rootScope.showmenu.MenuSujetCocab= true;
                                        $rootScope.showmenu.MenuSujetCocabListe = true;
                                        $rootScope.showmenu.MenuSujetCocabAjouter = true;
                                        break;

                                    case 5: // Secrétariat Général
                                        // ACCUEIL
                                        $rootScope.showmenu.MenuAccueilCocab= true;

                                        // SUJETS
                                        $rootScope.showmenu.MenuSujetCocab= true;
                                        $rootScope.showmenu.MenuSujetCocabListe = true;
                                        $rootScope.showmenu.MenuSujetCocabAjouter = true;
                                        break;
                                
                                    default:
                                        $rootScope.loginFormScope.error = "Problème lié à votre profil. Contactez l'administrateur";
                                        $state.go('login');
                                        break;
                                }
                            break;

                        default:
                            $rootScope.loginFormScope.error = "Problème lié à votre profil. Contactez l'administrateur";
                            $state.go('login');
                            break;
                    }
                //}
            }

})

//
ctrl.controller("HomeCtrl", function ($filter,$http,$scope, $rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

        $rootScope.titrepage = 'ACCUEIL';

        $scope.dataObject = {};
        $scope.searchingOrdreJour = true;

        $scope.refreshState = function (){
            $state.reload();
        }

        var getListCodirOuvert = function () {
            Model.getListCodirOuvert()
            .then(function () {
                $scope.codirouvert = Model.codirouvert;
                $scope.thiscodir =  $scope.codirouvert[0];
                console.info($scope.thiscodir);
                getListOrdreJourOneCodir();
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        }
        getListCodirOuvert();
        

        var getCountUtilisateurTotal =  function (){
            Model.getCountUtilisateurTotal()
                .then(function(){
                    $scope.totalutilisateurs = Model.totalutilisateurs;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        

        var getCountStructureTotal =  function (){
            Model.getCountStructureTotal()
                .then(function(){
                    $scope.totalstructures = Model.totalstructures;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountComInterMinistTotal =  function (){
            Model.getCountComInterMinistTotal()
                .then(function(){
                    $scope.totalcominterminist = Model.totalcominterminist;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountComInitMinistTotal =  function (){
            Model.getCountComInitMinistTotal()
                .then(function(){
                    $scope.totalcominitminist = Model.totalcominitminist;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountComInitMinistStructTotal =  function (id_structure){
            Model.getCountComInitMinistStructTotal(id_structure)
                .then(function(){
                    $scope.totalcominitministstruct = Model.totalcominitministstruct;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountSujetTotal =  function (){
            Model.getCountSujetTotal()
                .then(function(){
                    $scope.totalsujets = Model.totalsujets;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountSujetStructTotal =  function (id_structure){
            Model.getCountSujetStructTotal(id_structure)
                .then(function(){
                    $scope.totalsujetsstruct = Model.totalsujetsstruct;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        

        var getCountCodirTotal =  function (){
            Model.getCountCodirTotal()
                .then(function(){
                    $scope.totalcodirs = Model.totalcodirs;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountComInterMinistAffStructTotal =  function (id_structure){
            Model.getCountComInterMinistAffStructTotal(id_structure)
                .then(function(){
                    $scope.totalcominterministaffectes = Model.totalcominterministaffectes;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        var getCountComInterMinistAffStructAttenteTotal =  function (id_structure){
            Model.getCountComInterMinistAffStructAttenteTotal(id_structure)
                .then(function(){
                    $scope.totalcominterministaffectesattente = Model.totalcominterministaffectesattente;
                }, function (error){
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        

        if($rootScope.showmenu.isSuperAdminCodir || $rootScope.showmenu.isAdminCodir) {
            getCountUtilisateurTotal();
            getCountStructureTotal();
            getCountComInterMinistTotal();
            getCountComInitMinistTotal();
        }

        if($rootScope.showmenu.isMembreCabinetCodir || $rootScope.showmenu.isSecretGeneralCodir) {
            getCountComInterMinistTotal();
            getCountComInitMinistTotal();
            getCountSujetTotal();
            getCountCodirTotal();
        }

        if($rootScope.showmenu.isRepDirectCodir){
            getCountComInterMinistAffStructTotal($rootScope.UserConnected.IdStructure);
            getCountComInterMinistAffStructAttenteTotal($rootScope.UserConnected.IdStructure);
            getCountComInitMinistStructTotal($rootScope.UserConnected.IdStructure);
            getCountSujetStructTotal($rootScope.UserConnected.IdStructure);
        }

        

        $scope.sortableOptions = {
            'disabled':true,
            connectWith: ".list_reorder",
            axis: 'y',
            'ui-floating': false,
            start: function(e, ui) {
            },
            update: function(e, ui) {
            },
            stop: function(e, ui) {
              
            }
        };

        $scope.codir_ordre_jour = [];
        var getListOrdreJourOneCodir = function () {
            Model.getListOrdreJourOneCodir($scope.thiscodir.IdCodir)
              .then(function () {
                  $scope.codir_ordre_jour = Model.ordrejour;
                  console.info($scope.codir_ordre_jour);
                  getListSujetOneCodirOrdreJour();
              }, function (error) {
                  if(error.data.error == 'token_not_provided') {
                      $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                      $state.go('login');
                  }
              });
      }
      

        $scope.preference_ordre_jour = {};
        var getListPreferenceOrdreJourCodir = function () {
              Model.getListPreferenceOrdreJourCodir()
                .then(function () {
                    $scope.preference_ordre_jour = Model.preference;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        getListPreferenceOrdreJourCodir();

    $scope.dataObject.listeordre = [];
      var getListSujetOneCodirOrdreJour = function () {
        $scope.searchingOrdreJour = true;
        Model.getListSujetOneCodirOrdreJour($scope.thiscodir.IdCodir)
            .then(function () {
                $scope.sujets = Model.sujets;
                $scope.dataObject = {};
                $scope.dataObject.listeordre = [];
                if(!angular.equals($scope.codir_ordre_jour,[])) {
                    var add_id_type = '';
                    var array_preference_o_sujet = $scope.preference_ordre_jour.Valeur.split('-');
                    angular.forEach(array_preference_o_sujet, function(value,i){
                        if(value !=''){
                            if($scope.codir_ordre_jour.OrdreTypeSujet.indexOf('-'+value+'-') ===-1){
                                add_id_type = add_id_type + value+ '-';
                            }
                        }
                    });
                    var array_ordre_sujet_temp = $scope.codir_ordre_jour.OrdreTypeSujet + add_id_type;
                    var array_ordre_sujet = array_ordre_sujet_temp.split('-');
                    angular.forEach(array_ordre_sujet, function(value,j) {
                        if(value !='') {
                            var in_list = $filter('filter')($scope.sujets,{'IdTypeSujet':Utilitaire.convertToInt(value)},true)[0];
                            if(in_list != undefined && in_list!=null) {
                                $scope.dataObject.listeordre.push(in_list);
                            }
                        }
                    });
                }
                $scope.searchingOrdreJour = false;
            },function (error){

            });
        }

})

ctrl.controller('ProfilUserCtrl', function ($filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$window) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          else  {
                $scope.dataObject = {
                    newemail:'',
                    contacts:'',
                    oldpassword:'',
                    newpassword:'',
                    newpasswordconfirm:'',
                    submit:false
                }
          }
          }).error(function(error) {
              $state.go('login');
      });

    // AFFICHER LE MENU
    $rootScope.SectionMenu = true;
    $scope.errorform = false;

    $scope.resetError = function () {
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";
    }

    $scope.saveUpdateProfil = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            if($scope.dataObject.newemail !='') {
                if($scope.dataObject.oldpassword =='' ) {
                    $scope.ctrlmessage = " Veuillez renseigner votre mot de passe actuel.";
                    $scope.errorform = true;
                }
                if($scope.dataObject.newemail === $rootScope.UserConnected.Email) {
                    $scope.ctrlmessage = $scope.ctrlmessage + " Utiliser une adresse email différente de l'actuelle.";
                    $scope.errorform = true;
                }
            }

            if($scope.dataObject.newpassword !='') {
                
                if($scope.dataObject.oldpassword =='' ) {
                    $scope.ctrlmessage =  $scope.ctrlmessage + " Veuillez saisir l'ancien mot de passe.";
                    $scope.errorform = true;
                }

                if($scope.dataObject.newpassword !== $scope.dataObject.newpasswordconfirm) {
                    $scope.ctrlmessage = $scope.ctrlmessage + " Confirmation du nouveau mot de passe non conforme.";
                    $scope.errorform = true;
                }
            } 
            
            if($scope.dataObject.newemail =='' && $scope.dataObject.newpassword =='' && $scope.dataObject.contacts ==''){
                $scope.ctrlmessage = $scope.ctrlmessage + " Renseignez au moins un champ à modifier";
                $scope.errorform = true;
            }

            if(!$scope.errorform) {
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    IdUtilisateur:$rootScope.UserConnected.IdUtilisateur,
                    oldemail:$rootScope.UserConnected.Email,
                    newemail:$scope.dataObject.newemail,
                    oldpassword:$scope.dataObject.oldpassword,
                    newpassword:$scope.dataObject.newpassword,
                    contacts:$scope.dataObject.contacts
                }

                Model.saveUpdateProfil(params)
                    .then(function() {

                        if (Model.updateprofil.status !== "error") {
                             // Récupération des infos de l'utilisateur
                            $http.get(server_urlcheckauth+'/userdata').success(function(users) {
                                $scope.dataObject = {
                                    newemail:'',
                                    contacts:'',
                                    oldpassword:'',
                                    newpassword:'',
                                    newpasswordconfirm:'',
                                    submit:false
                                }
                                users.current_module_id = $rootScope.UserConnected.current_module_id;
                                users.current_module = $rootScope.UserConnected.current_module;
                                Utilitaire.saveUser(users);
                                $rootScope.UserConnected = users;
                            });
                        
                            if($scope.dataObject.newemail!="" || $scope.dataObject.newpassword!="")
                            {
                                // Déconnecter l'utilisateur
                                //$('#ProfilUserModal').modal('hide');
                                $rootScope.loginFormScope.error = "Paramètres d'authentification changés ! Reconnectez-vous SVP...";
                                $state.go('login');
                            }
                             $scope.successform = true;
                             $scope.dataObject = {};
                             $scope.ctrlmessage = "Profil mis à jour avec succès !";
                        }
                        else {
                            $scope.dataObject.submit = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = Model.updateprofil.message;
                        }

                    },function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.error;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    }
                    );
                    
            }
            else $scope.dataObject.submit = false;
            
    }

})
//
ctrl.controller("StructuresCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {

    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Structures";

      $scope.table = {};

      var getListStructure = function () {
        $scope.table.isSearching = true;
          Model.getListStructure()
            .then(function () {
                $scope.structures = Model.structures;
                $scope.table.isSearching = false;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
      }
       getListStructure();

       var getListModule = function () {
        Model.getListModule()
            .then(function () {
                $scope.modules = Model.modules;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        }
        getListModule();

        // Liste des utilisateurs sans poste de responsabilité
        var getListUtilisateurFree = function () {
            Model.getListUtilisateurFree()
                .then(function () {
                    $scope.usersfree = Model.utilisateurs;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListUtilisateurFree();
        // Liste des utilisateurs
        var getListUtilisateur = function () {
            Model.getListUtilisateur()
                .then(function () {
                    $scope.allusers = Model.utilisateurs;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListUtilisateur();

        $scope.choixparticip = [{'id':1,'label':'Oui'},{'id':0,'label':'Non'}];

        $scope.refreshState = function (){
            $state.reload();
        }

        
        // POPUP
        $scope.formStructure = function(modalstate,obj) {
        $scope.modalstate = modalstate;
        $scope.ctrlmessage = '';
        $scope.errorform = false;
        $scope.successform = false;

        $scope.dataObject = {};

        switch(modalstate) {
            case 'add' :
                $scope.dataObject.form_title = "Ajouter une structure";
                $scope.dataObject.id = 0;
                $scope.dataObject.nom = '';
                $scope.dataObject.sigle = '';
                $scope.dataObject.responsable = '';
                $scope.dataObject.modules = '';
                $scope.dataObject.participation_codir = {};
                
                break;

            case 'edit':
                $scope.dataObject.form_title = "Modifier une structure";
                $scope.dataObject.id = obj.IdStructure;
                $scope.dataObject.nom = obj.NomStructure;
                $scope.dataObject.sigle = obj.SigleStructure;
                $scope.dataObject.responsable = $filter('filter')($scope.allusers, {'IdUtilisateur': Utilitaire.convertToInt(obj.RespStructure)},true)[0];
                $scope.dataObject.modules = [];
                if(obj.modules_structure.length) {
                    angular.forEach($scope.modules, function(value1,j) {
                        angular.forEach(obj.modules_structure, function(value,i) {
                            if($scope.modules[j].IdModule===obj.modules_structure[i].IdModule)
                                $scope.dataObject.modules.push($scope.modules[j]);
                        });
                    });
                }
                $scope.dataObject.participation_codir = $filter('filter')($scope.choixparticip, {'id': obj.IsExpected},true)[0];
                break;

            default : 
                break;
        }

        $('#AddEditStructureModal').modal('show');
    }

    $scope.resetError = function () {
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";
    }

    $scope.errorform = false;

    $scope.saveStructure = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            // Récupération des modules choisis
            var modules_structure = [];
            angular.forEach($scope.dataObject.modules, function(value,i) {   
                modules_structure.push({IdModule:value.IdModule});
            });
            var resp_struct = 0;
            if($scope.dataObject.responsable =='' 
                || angular.equals($scope.dataObject.responsable,{}) 
                || $scope.dataObject.responsable===undefined 
                || $scope.dataObject.responsable===null ){
                resp_struct = 0;
            }
            else {
                resp_struct = $scope.dataObject.responsable.IdUtilisateur;
            }

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                md: $scope.modalstate,
                IdStructure:$scope.dataObject.id,
                NomStructure:$scope.dataObject.nom,
                SigleStructure:$scope.dataObject.sigle,
                RespStructure:resp_struct,
                Modules:modules_structure,
                IsExpected:$scope.dataObject.participation_codir.id
            }

            Model.saveStructure(params)
                .then(function () {
                    $scope.structures = Model.structures;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                    $('#AddEditStructureModal').modal('hide');$('#AddEditStructureModal').modal('hide');
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $('#AddEditStructureModal').modal('hide');
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
    }

     // SUPPRIMER
    $scope.dropStructure = function(o) {

        var msgConfirm = "Voulez-vous supprimer la structure " + o.SigleStructure + " ?";
        var confirmResult = confirm(msgConfirm);
        if (confirmResult === false) return;

        var params = {
            after_done:1
        };

        Model.dropStructure(o.IdStructure,params)
            .then(
              function () {
                      $scope.structures = Model.structures;
              },
              function (error) { 
                    $scope.ctrlmessage = error.data.message; 
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
             });
    } 
})
//
ctrl.controller("TypesSujetCodirCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Types de sujet CODIR";
    
          $scope.table = {};
    
          var getListTypeSujetCodir = function () {
            $scope.table.isSearching = true;
              Model.getListTypeSujetCodir()
                .then(function () {
                    $scope.typessujet = Model.typessujet;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
          }
           getListTypeSujetCodir();

        var getListProfilCodir = function () {
            Model.getListProfilCodir()
                .then(function () {
                    $scope.profilscodir = Model.profilscodir;
                }, function(error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        getListProfilCodir();

         // PREREMPLIR LES PROFILS
         $scope.etatsgenerique = [
            {'id_etat':0,'lib_etat':'Non'},
            {'id_etat':1,'lib_etat':'Oui'}
        ];

        $scope.refreshState = function (){
            $state.reload();
        }           
        
            // POPUP
            $scope.formTypeSujet = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter un type de sujet";
                    $scope.dataObject.id = 0;
                    $scope.dataObject.libelle = '';
                    $scope.dataObject.profils = '';
                    $scope.dataObject.etatgenerique = $scope.etatsgenerique[0];
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier un type de sujet";
                    $scope.dataObject.id = obj.IdTypeSujet;
                    $scope.dataObject.libelle = obj.LibelleTypeSujet;
                    $scope.dataObject.profils = [];
                    if(obj.ProfilsAcces !='') {
                        var array_profils_right = obj.ProfilsAcces.split('-');
                        angular.forEach($scope.profilscodir, function(value1,i) {
                            angular.forEach(array_profils_right, function(value2,j) {
                                if(value2 !='') {
                                    if($scope.profilscodir[i].IdProfilCodir === Utilitaire.convertToInt(value2))
                                        $scope.dataObject.profils.push($scope.profilscodir[i]);
                                }
                            });
                        });
                    }
                    $scope.dataObject.etatgenerique = $filter('filter')($scope.etatsgenerique,{'id_etat':obj.Generique},true)[0];
                    break;
    
                default : 
                    break;
            }
    
            $('#AddEditTypeSujetModal').modal('show');
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveTypeSujet = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var profils_type_sujet = [];
                angular.forEach($scope.dataObject.profils, function(value,i) {   
                 profils_type_sujet.push(value.IdProfilCodir);
                });
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdTypeSujet:$scope.dataObject.id,
                    LibelleTypeSujet:$scope.dataObject.libelle,
                    ProfilsAcces:profils_type_sujet,
                    Generique:$scope.dataObject.etatgenerique.id_etat
                }
    
                Model.saveTypeSujetCodir(params)
                    .then(function () {
                        $scope.typessujet = Model.typessujet;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                        $('#AddEditTypeSujetModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#AddEditTypeSujetModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }
    
         // SUPPRIMER
        $scope.dropTypeSujet = function(o) {
    
            var msgConfirm = "Voulez-vous supprimer le type de sujet " + o.LibelleTypeSujet + " ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                after_done:1,
                current_module_id : $rootScope.UserConnected.current_module_id
            };
    
            Model.dropTypeSujetCodir(o.IdTypeSujet,params)
                .then(
                  function () {
                          $scope.typessujet = Model.typessujet;
                  },
                  function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                 });
        } 
})

//
ctrl.controller("TypesSujetCocabCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Types de sujet COCAB";
    
          $scope.table = {};
    
          var getListTypeSujetCocab = function () {
            $scope.table.isSearching = true;
              Model.getListTypeSujetCocab()
                .then(function () {
                    $scope.typessujet = Model.typessujet;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
          }
           getListTypeSujetCocab();

           $scope.refreshState = function (){
            $state.reload();
            }
        
            // POPUP
            $scope.formTypeSujet = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter un type de sujet";
                    $scope.dataObject.id = 0;
                    $scope.dataObject.libelle = '';
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier un type de sujet";
                    $scope.dataObject.id = obj.IdTypeSujet;
                    $scope.dataObject.libelle = obj.LibelleTypeSujet;
                    break;
    
                default : 
                    break;
            }
    
            $('#AddEditTypeSujetModal').modal('show');
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveTypeSujet = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdTypeSujet:$scope.dataObject.id,
                    LibelleTypeSujet:$scope.dataObject.libelle
                }
    
                Model.saveTypeSujetCocab(params)
                    .then(function () {
                        $scope.typessujet = Model.typessujet;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                        $('#AddEditTypeSujetModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#AddEditTypeSujetModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }
    
         // SUPPRIMER
        $scope.dropTypeSujet = function(o) {
    
            var msgConfirm = "Voulez-vous supprimer le type de sujet " + o.LibelleTypeSujet + " ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                after_done:1,
                current_module_id : $rootScope.UserConnected.current_module_id
            };
    
            Model.dropTypeSujetCocab(o.IdTypeSujet,params)
                .then(
                  function () {
                          $scope.typessujet = Model.typessujet;
                  },
                  function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                 });
        } 
})

ctrl.controller("LogsActionsCtrl", function($window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Logs des actions";

      $scope.table = {};

       $scope.table.dtInstance = {};
        
       $scope.table.dtColumns = [
            DTColumnBuilder.newColumn('id_logs','ID')
                .withOption('name','id_logs'),
            DTColumnBuilder.newColumn('action','Actions')
                .withOption('name','action'),
            DTColumnBuilder.newColumn('date_logs','Date action').notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta){
                return moment(data).format('DD-MM-YYYY HH:mm')
            }),
            DTColumnBuilder.newColumn('connexion_user.Nom','Nom').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('connexion_user.Prenoms','Prénoms').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('connexion_user.email','Email').notSortable()
                .withOption('searchable',false),
            ];
        $scope.table.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'logactions', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withPaginationType('simple_numbers');
})

ctrl.controller("PostesCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Postes";
    
          $scope.table = {};
    
          var getListPoste = function () {
                $scope.table.isSearching = true;
              Model.getListPoste()
                .then(function () {
                    $scope.postes = Model.postes;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
          }
           getListPoste();

           var getListUtilisateur = function () {
            Model.getListUtilisateur()
              .then(function () {
                  $scope.utilisateurs = Model.utilisateurs;
              }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
              });
        }
         getListUtilisateur();

         $scope.refreshState = function (){
            $state.reload();
        }
        
            // POPUP
            $scope.formPoste = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter un poste";
                    $scope.dataObject.id = 0;
                    $scope.dataObject.sigle = '';
                    $scope.dataObject.libelle = '';
                    $scope.dataObject.occupant = {};
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier un poste";
                    $scope.dataObject.id = obj.IdPoste;
                    $scope.dataObject.sigle = obj.SiglePoste;
                    $scope.dataObject.libelle = obj.LibellePoste;
                    $scope.dataObject.occupant = $filter('filter')($scope.utilisateurs, {'IdUtilisateur': Utilitaire.convertToInt(obj.IdUtilisateur)},true)[0];
                    break;
    
                default : 
                    break;
            }
    
            $('#AddEditPosteModal').modal('show');
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.savePoste = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var occupant_poste = 0;
                if($scope.dataObject.occupant =='' 
                    || angular.equals($scope.dataObject.occupant,{}) 
                    || $scope.dataObject.occupant===undefined 
                    || $scope.dataObject.occupant===null ){
                    occupant_poste = 0;
                }
                else {
                    occupant_poste = $scope.dataObject.occupant.IdUtilisateur;
                }
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdPoste:$scope.dataObject.id,
                    SiglePoste:$scope.dataObject.sigle,
                    LibellePoste:$scope.dataObject.libelle,
                    IdUtilisateur:occupant_poste,
                }
    
                Model.savePoste(params)
                    .then(function () {
                        $scope.postes = Model.postes;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                        $('#AddEditPosteModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#AddEditPosteModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }
    
         // SUPPRIMER
        $scope.dropPoste = function(o) {
    
            var msgConfirm = "Voulez-vous supprimer le poste " + o.LibellePoste + " ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                after_done:1,
                current_module_id : $rootScope.UserConnected.current_module_id
            };
    
            Model.dropPoste(o.IdPoste,params)
                .then(
                  function () {
                          $scope.postes = Model.postes;
                  },
                  function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                 });
        } 
})

//
ctrl.controller("UtilisateursCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {

    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Utilisateurs du système";

      $scope.table = {};

      var getListUtilisateur = function () {
        $scope.table.isSearching = true;
          Model.getListUtilisateur()
            .then(function () {
                $scope.utilisateurs = Model.utilisateurs;
                $scope.table.isSearching = false;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
      }
       getListUtilisateur();

      var getListStructure = function () {
          Model.getListStructure()
            .then(function () {
                $scope.structures = Model.structures;
            }, function(error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
      }
      getListStructure();

        var getListProfilCodir = function () {
        Model.getListProfilCodir()
            .then(function () {
                $scope.profilscodir = Model.profilscodir;
            }, function(error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        }
        getListProfilCodir();

        var getListProfilCocab = function () {
            Model.getListProfilCocab()
                .then(function () {
                    $scope.profilscocab = Model.profilscocab;
                }, function(error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
        getListProfilCocab();

        var getListPoste = function () {
            Model.getListPoste()
                .then(function () {
                    $scope.postes = Model.postes;
                }, function(error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
        getListPoste();

    // PREREMPLIR LES NIVEAUX DE VISIBILITE
    $scope.sexes = [{'id':'M','label':'Masculin'},{'id':'F','label':'Féminin'}];
                    

    $scope.refreshState = function (){
        $state.reload();
    }

        // POPUP
        $scope.formUtilisateur = function(modalstate,obj) {
        $scope.modalstate = modalstate;
        $scope.ctrlmessage = '';
        $scope.errorform = false;
        $scope.successform = false;

        $scope.dataObject = {};

        switch(modalstate) {
            case 'add' :
                $scope.dataObject.form_title = "Ajouter un utilisateur";
                $scope.dataObject.newform = true;
                $scope.dataObject.id = '';
                $scope.dataObject.nom = '';
                $scope.dataObject.prenom = '';
                $scope.dataObject.structure = {};
                $scope.dataObject.fonction = '';
                $scope.dataObject.sexe = {};
                $scope.dataObject.contacts = '';
                $scope.dataObject.email = '';
                $scope.dataObject.password = '';
                $scope.dataObject.passwordconfirm = '';

                $scope.dataObject.profilcodir = {};
                $scope.dataObject.profilcocab = {};

                $scope.dataObject.postestrateg = {};
                
                break;

            case 'edit':
                //getListPoste();
                $scope.dataObject.form_title = "Modifier un utilisateur";
                $scope.dataObject.newform = false;
                $scope.dataObject.id = obj.IdUtilisateur;
                $scope.dataObject.nom = obj.Nom;
                $scope.dataObject.prenom = obj.Prenoms;
                $scope.dataObject.structure = $filter('filter')($scope.structures, {'IdStructure': Utilitaire.convertToInt(obj.IdStructure)},true)[0];
                $scope.dataObject.fonction = obj.Fonction;
                $scope.dataObject.sexe = $filter('filter')($scope.sexes,{'id':obj.Sexe},true)[0];
                $scope.dataObject.email = obj.Email;
                $scope.dataObject.contacts = obj.Contacts;
                $scope.dataObject.newpassword = '';
                $scope.dataObject.newpasswordconfirm = '';
                
                $scope.dataObject.profilcodir = $filter('filter')($scope.profilscodir,{'IdProfilCodir':obj.ProfilCodir},true)[0];
                $scope.dataObject.profilcocab = $filter('filter')($scope.profilscocab,{'IdProfilCocab':obj.ProfilCocab},true)[0];
                
                $scope.dataObject.postestrateg = {};
                if(obj.poste_strateg_user != null)
                    $scope.dataObject.postestrateg = $filter('filter')($scope.postes, {'IdPoste': obj.poste_strateg_user.IdPoste},true)[0];
                break;

            default : 
                break;
        }

        $('#AddEditUtilisateurModal').modal('show');
    }

    $scope.resetError = function () {
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";
    }

    $scope.errorform = false;

    $scope.saveUtilisateur = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

        if($scope.dataObject.newform){
            if($scope.dataObject.password !==$scope.dataObject.passwordconfirm) {
                $scope.ctrlmessage = "Mot de passe non conforme. ";
                $scope.errorform = true;
            }
        }
        else {
            if($scope.dataObject.newpassword !=="" || $scope.dataObject.newpasswordconfirm !=="") {
                if($scope.dataObject.newpassword !==$scope.dataObject.newpasswordconfirm) {
                    $scope.ctrlmessage = "Mot de passe non conforme";
                    $scope.errorform = true;
                }
                else {
                    $scope.dataObject.password = $scope.dataObject.newpassword;
                }
            }
            else {
                $scope.dataObject.password = '';
            }
        }

        if(!$scope.errorform) {

            var id_profil_codir = 0;
            if($scope.dataObject.profilcodir =='' 
                || angular.equals($scope.dataObject.profilcodir,{}) 
                || $scope.dataObject.profilcodir===undefined 
                || $scope.dataObject.profilcodir===null ){
                id_profil_codir = 0;
            }
            else {
                id_profil_codir = $scope.dataObject.profilcodir.IdProfilCodir;
            }

            var id_profil_cocab = 0;
            if($scope.dataObject.profilcocab =='' 
                || angular.equals($scope.dataObject.profilcocab,{}) 
                || $scope.dataObject.profilcocab===undefined 
                || $scope.dataObject.profilcocab===null ){
                id_profil_cocab = 0;
            }
            else {
                id_profil_cocab = $scope.dataObject.profilcocab.IdProfilCocab;
            }

            var id_poste_strateg = 0;
            if($scope.dataObject.postestrateg =='' 
                || angular.equals($scope.dataObject.postestrateg,{}) 
                || $scope.dataObject.postestrateg===undefined 
                || $scope.dataObject.postestrateg===null ){
                id_poste_strateg = 0;
            }
            else {
                id_poste_strateg = $scope.dataObject.postestrateg.IdPoste;
            }

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                md: $scope.modalstate,
                IdUtilisateur:$scope.dataObject.id,
                Nom:$scope.dataObject.nom,
                Prenoms:$scope.dataObject.prenom,
                IdStructure:$scope.dataObject.structure.IdStructure,
                Fonction:$scope.dataObject.fonction,
                Sexe:$scope.dataObject.sexe.id,
                Contacts:$scope.dataObject.contacts,
                Email:$scope.dataObject.email,
                password:$scope.dataObject.password,

                ProfilCodir:id_profil_codir,
                ProfilCocab:id_profil_cocab,
                PosteStrateg:id_poste_strateg
            }

            Model.saveUtilisateur(params)
                .then(function () {
                    $scope.utilisateurs = Model.utilisateurs;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                    $('#AddEditUtilisateurModal').modal('hide');
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $('#AddEditUtilisateurModal').modal('hide');
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        else {
            $scope.dataObject.submit = false;
        }
    }

    // Détails d'un utilisateur
    $scope.DetailsUtilisateur = function (obj){
        $scope.dataObject = {};
        $scope.dataObject.Lab_form_title = "Détails";
        $scope.dataObject.Lab_nom = obj.Nom;
        $scope.dataObject.Lab_prenom = obj.Prenoms;
        $scope.dataObject.Lab_structure = obj.structure_user.NomStructure
        $scope.dataObject.Lab_fonction = obj.Fonction;
        $scope.dataObject.Lab_sexe = $filter('filter')($scope.sexes,{'id':obj.Sexe},true)[0].label;
        $scope.dataObject.Lab_email = obj.Email;
        $scope.dataObject.Lab_contacts = obj.Contacts;

        $('#DetailsUtilisateurModal').modal('show');
    }

     // SUPPRIMER
    $scope.dropUtilisateur = function(o) {

        var msgConfirm = "Voulez-vous supprimer l'utilisateur " + o.Nom +o.Prenoms + " ?";
        var confirmResult = confirm(msgConfirm);
        if (confirmResult === false) return;

        var params = {
            after_done:1
        };

        Model.dropUtilisateur(o.IdUtilisateur,params)
            .then(
              function () {
                      $scope.utilisateurs = Model.utilisateurs;
              },
              function (error) { 
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    } 
             });
    } 
})

ctrl.controller("PreferencesCodirCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Paramétrage des préférences du CODIR";
    
          $scope.table = {};
    
          var getListPreferencesCodir = function () {
            $scope.table.isSearching = true;
              Model.getListPreferencesCodir()
                .then(function () {
                    $scope.preferences = Model.preferences;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
          }
        getListPreferencesCodir();

        var getListTypeSujetCodir = function () {
            $scope.table.isSearching = true;
              Model.getListTypeSujetCodir()
                .then(function () {
                    $scope.typessujet = Model.typessujet;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        getListTypeSujetCodir();


        $scope.refreshState = function (){
            $state.reload();
        }
        
        $scope.sortableOptions = {
            connectWith: ".list_reorder",
            axis: 'y',
            'ui-floating': true,
            start: function(e, ui) {
            },
            update: function(e, ui) {
            },
            stop: function(e, ui) {
              
            }
        };

        $scope.sortableOptionsView = {
            'disabled':true,
            connectWith: ".list_reorder",
            axis: 'y',
            'ui-floating': false,
            start: function(e, ui) {
            },
            update: function(e, ui) {
            },
            stop: function(e, ui) {
              
            }
        };
        
        
            // POPUP
            $scope.formPreference = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'ordre_jour_par_point':
                case 'view_ordre_jour_par_point':
                    $scope.dataObject.form_title = "Préférence ordre points à inscrire au codir";
                    $scope.dataObject.id = obj.id;
                    $scope.dataObject.libelle = obj.LibellePreference;
                    $scope.dataObject.listeordre = [];
                    
                    if(obj.Valeur !='') {
                        var array_ordre_sujet = obj.Valeur.split('-');
                        angular.forEach(array_ordre_sujet, function(value2,j) {
                            if(value2 !='') {
                                var in_list = $filter('filter')($scope.typessujet,{'IdTypeSujet':Utilitaire.convertToInt(value2)},true)[0];
                                if(in_list != undefined && in_list!=null) {
                                    $scope.dataObject.listeordre.push(in_list);
                                }
                            }
                        });   
                    }else {
                        $scope.dataObject.listeordre = $scope.typessujet;
                    }
                    if(modalstate == 'ordre_jour_par_point')
                        $('#EditPreferenceOrdreJourModal').modal('show');
                    else  $('#ViewPreferenceOrdreJourModal').modal('show');
                    break;

                default : 
                    break;
            }
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.savePreferenceOrdreJourCodir = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var ids_type_sujet = [];
                angular.forEach($scope.dataObject.listeordre, function(value,i) {   
                 ids_type_sujet.push(value.IdTypeSujet);
                });
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    id:$scope.dataObject.id,
                    LibellePreference:$scope.dataObject.libelle,
                    Valeur:ids_type_sujet
                }
    
                Model.savePreferenceOrdreJourCodir(params)
                    .then(function () {
                        $scope.preferences = Model.preferences;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Préférence mise à jour !";
                        $('#EditPreferenceOrdreJourModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#AddEditTypeSujetModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }

})

ctrl.controller("ListeSujetsCodirCtrl", function($sce,$window,$filter,FileUploader,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {

    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Liste des sujets";
    
          $scope.table = {};

          var getListCodirOuvert = function () {
            Model.getListCodirOuvert()
            .then(function () {
                $scope.codirouvert = Model.codirouvert;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        }
        getListCodirOuvert();
    
            var getListSujet = function () {
                $scope.table.isSearching = true;
                Model.getListSujetCodir()
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
            getListSujet();

            $scope.filterByStructure = function(sujet) {
                if($rootScope.UserConnected.ProfilCodir == 4) {
                    if(sujet.IdStructure != $rootScope.UserConnected.IdStructure) return false;
                }
                return true; 
            }

            $scope.filterTypeSujetByProfil = function (item){
                if(item.ProfilsAcces !='') {
                    var tab_profils = item.ProfilsAcces.split('-');
                    var count_prof = 0;
                    angular.forEach(tab_profils,function (value,i){
                        if(value !='') {
                            if($rootScope.UserConnected.ProfilCodir == value) {
                                count_prof++;
                            }
                        }
                    });
                    if(count_prof > 0) return true;
                    return false;
                }
                return true;
            }

            var getListTypeSujet = function () {
                Model.getListTypeSujetCodir()
                .then(function () {
                    $scope.typessujet = Model.typessujet;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
            getListTypeSujet();

            // PREREMPLIR LES PROFILS
            $scope.etats = [
                {'id_etat':1,'lib_etat':'Enregistrer'},
                {'id_etat':2,'lib_etat':'Envoyer'}
            ];

            $scope.actions = [
                {'id_etat':1,'lib_etat':'Proposer'},
                {'id_etat':2,'lib_etat':'Annuler la proposition'}
            ];

            $scope.setLibelleSujet = function (){
                var type_selected = $scope.dataObject.typesujet;
                if(type_selected.Generique == 1) {
                    switch (type_selected.Slug) {
                        case 'com_comite_inter_m':
                            $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                            break;

                        case 'adopt_compt_rendu':
                            $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                            break;

                        case 'adopt_compt_rendu':
                            $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                            break;

                        case 'point_taches_codir':
                            $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                            break;
                    
                        default:
                            $scope.dataObject.libelle = '';
                            break;
                    }
                }else {
                    // Gestion des communications initiées par le MTFPAS
                    $state.go('app.codir.com_init_ministere');
                }
            }

            $scope.saveInscripSujetCodir = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:0,
                    IdCodir:$scope.codirouvert[0].IdCodir,
                    IdSujet:$scope.dataObject.id_suj,
                    FromComiteDirection:1,
                    Action:1
                }
                Model.saveInscripSujetCodir(params)
                    .then(function () {
                        getListSujet();
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }

            // Gestion de l'envoi des fichiers sur le serveur
            var uploader = $scope.uploader = new FileUploader({
                url: server_url + 'codir/sujet',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
            });
    
            // Add metadata to form for retrieve there on server
            uploader.onBeforeUploadItem = function(item) {
              
              if($scope.dataObject.id !=0) {
                  item.url =  $scope.uploader.url + "/" + $scope.dataObject.id;
              }
                  item.formData.push($scope.params);
            };
    
            // Filtre
            var supportedFileFormat = [
                'application/pdf',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ];
            uploader.filters.push({
                name: 'filtrefile',
                fn: function(item,options) {
                        if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                            {
                                if(item.size <= 5242880)  return true; // <--5 Mo //  1048576(o) = 1Mo = 1024 * 1024 (1o)
                            }      
                        return false;
                }
            });
    
            uploader.onAfterAddingFile = function(fileItem) {
                $scope.errorform = false;
                $scope.ctrlmessage = "";
            };
    
          uploader.onWhenAddingFileFailed = function(item, filter, options) {
              $scope.showUploadButton = false;
              $scope.errorform = true;
              $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
            }
          uploader.onSuccessItem = function(item, response,status,headers) {
              if(status == 200) {
                  $scope.successform = true;
                  $scope.sujets = response;
                  $scope.dataObject.submit = false;
                  $scope.successform = true;
                  $scope.ctrlmessage = "Enregistrement effectué !";
                  $('#AddEditSujetModal').modal('hide');
                  uploader.clearQueue();
              }
              else {
                  $scope.dataObject.submit = false;
                  $scope.errorform = true;
                  $scope.ctrlmessage = response.message;
                  if(response.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
              }  
          }
        uploader.onErrorItem = function (item, response,status,headers) {
            $scope.ctrlmessage = response.message;
            $scope.dataObject.submit = false;
            $scope.errorform = true;
        }
      

        $scope.refreshState = function (){
            $state.reload();
        }
                
            // POPUP
            $scope.formSujet = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
            uploader.clearQueue();
            document.getElementById('fileupload').value = null;
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter un sujet";
                    $scope.dataObject.id = 0;
                    $scope.dataObject.libelle = '';
                    $scope.dataObject.typesujet = '';
                    $scope.dataObject.etat = '';
                    $scope.dataObject.observations = '';
                    
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier un sujet";
                    $scope.dataObject.id = obj.IdSujet;
                    $scope.dataObject.libelle = obj.LibelleSujet;
                    $scope.dataObject.typesujet = $filter('filter')($scope.typessujet, {'IdTypeSujet': Utilitaire.convertToInt(obj.IdTypeSujet)},true)[0];
                    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt(obj.EtatSujet)},true)[0];
                    $scope.dataObject.observations = obj.Observations;
                    break;
    
                default : 
                    break;
            }
    
            $('#AddEditSujetModal').modal('show');
        }



        $scope.formPropSujCodir = function (obj){
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};

            $scope.dataObject.form_title = "Proposer le sujet au prochain codir";
            $scope.dataObject.id = obj.IdSujet;
            $scope.dataObject.id_structure = obj.IdStructure;
            $scope.dataObject.libelle_sujet = obj.LibelleSujet;
            $scope.dataObject.lib_nextcodir = $scope.codirouvert[0].LibelleCodir;
            $scope.dataObject.action = $scope.actions[0];
            $('#ProposerSujCodirModal').modal('show');
        }

        $scope.formRegisterSujCodir = function (suj){
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            $scope.dataObject.form_title = "Inscrire le sujet au codir";
            $scope.dataObject.id_suj = suj.IdSujet;
            $scope.dataObject.suj_titre = suj.LibelleSujet;
            $('#InscripSujetCodir').modal('show');
        }

        if($stateParams.add != null) {
            $scope.formSujet('add',0);
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveSujet = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                $scope.params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdSujet:$scope.dataObject.id,
                    LibelleSujet:$scope.dataObject.libelle,
                    IdTypeSujet:$scope.dataObject.typesujet.IdTypeSujet,
                    EtatSujet:$scope.dataObject.etat.id_etat,
                    Observations:$scope.dataObject.observations
                }
                if(uploader.queue.length > 0) {
                    uploader.uploadAll();
                }else {
                    Model.saveSujetCodir($scope.params)
                        .then(function () {
                            $scope.sujets = Model.sujets;
                            $scope.dataObject.submit = false;
                            $scope.successform = true;
                            $scope.ctrlmessage = "Enregistrement effectué !";
                            $('#AddEditSujetModal').modal('hide');
                        }, function (error) {
                            $scope.dataObject.submit = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = error.data.message;
                            if(error.data.error == 'token_not_provided') {
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            }
                        });
                    }
        }
    
         // SUPPRIMER
        $scope.dropSujet = function(o) {
    
            var msgConfirm = "Voulez-vous supprimer le sujet " + o.LibelleSujet + " ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1
            };
    
            Model.dropSujetCodir(o.IdSujet,params)
                .then(
                  function () {
                          $scope.sujets = Model.sujets;
                  },
                  function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                 });
        }
        
        $scope.DetailsSujet = function (obj){
            $scope.dataObject = {};
            $scope.dataObject.Lab_form_title = "Détails";
            $scope.dataObject.Lab_libelle = obj.LibelleSujet;
            $scope.dataObject.Lab_typesujet = obj.type_sujet.LibelleTypeSujet;
            $scope.dataObject.Lab_etat = obj.LibelleEtat;
            $scope.dataObject.Lab_auteur = obj.structure_sujet.SigleStructure;
            $scope.dataObject.Lab_observations = obj.Observations;
    
            $('#DetailsSujetModal').modal('show');
        }

        $scope.savePropSujCodir = function () {
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                md: $scope.modalstate,
                IdSujet:$scope.dataObject.id,
                IdStructure:$scope.dataObject.id_structure,
                IdCodir:$scope.codirouvert[0].IdCodir,
                Action:$scope.dataObject.action.id_etat
            }

            Model.savePropSujCodir(params)
                .then(function () {
                    //$scope.sujets = Model.sujets;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                    //$('#ProposerSujCodirModal').modal('hide');
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $('#ProposerSujCodirModal').modal('hide');
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }


})


ctrl.controller("ListeSujetsCocabCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
         $http.get(server_urlcheckauth).success(function() {
              $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
              if($rootScope.UserConnected === null)
                  $state.go('login');
              }).error(function(error) {
                  $state.go('login');
          });
    
          $rootScope.titrepage = "Liste des sujets";
    
          $scope.table = {};
    
            var getListSujet = function () {
                $scope.table.isSearching = true;
                Model.getListSujetCocab()
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.table.isSearching = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
            getListSujet();

            var getListTypeSujet = function () {
                Model.getListTypeSujetCocab()
                .then(function () {
                    $scope.typessujet = Model.typessujet;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
            }
            getListTypeSujet();

            // PREREMPLIR LES PROFILS
                $scope.etats = [
                    {'id_etat':1,'lib_etat':'Enregistrer'},
                    {'id_etat':2,'lib_etat':'Envoyer'}
                ];

                $scope.refreshState = function (){
                    $state.reload();
                }
                
            // POPUP
            $scope.formSujet = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter un sujet";
                    $scope.dataObject.id = 0;
                    $scope.dataObject.libelle = '';
                    $scope.dataObject.typesujet = '';
                    $scope.dataObject.etat = '';
                    $scope.dataObject.observations = '';
                    
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier un sujet";
                    $scope.dataObject.id = obj.IdSujet;
                    $scope.dataObject.libelle = obj.LibelleSujet;
                    $scope.dataObject.typesujet = $filter('filter')($scope.typessujet, {'IdTypeSujet': Utilitaire.convertToInt(obj.IdTypeSujet)},true)[0];
                    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt(obj.EtatSujet)},true)[0];
                    $scope.dataObject.observations = obj.Observations;
                    break;
    
                default : 
                    break;
            }
    
            $('#AddEditSujetModal').modal('show');
        }

        if($stateParams.add != null) {
            $scope.formSujet('add',0);
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveSujet = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdSujet:$scope.dataObject.id,
                    LibelleSujet:$scope.dataObject.libelle,
                    IdTypeSujet:$scope.dataObject.typesujet.IdTypeSujet,
                    EtatSujet:$scope.dataObject.etat.id_etat,
                    Observations:$scope.dataObject.observations
                }
    
                Model.saveSujetCocab(params)
                    .then(function () {
                        $scope.sujets = Model.sujets;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                        $('#AddEditSujetModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#AddEditSujetModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }
    
         // SUPPRIMER
        $scope.dropSujet = function(o) {
    
            var msgConfirm = "Voulez-vous supprimer le sujet " + o.LibelleSujet + " ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1
            };
    
            Model.dropSujetCocab(o.IdSujet,params)
                .then(
                  function () {
                          $scope.sujets = Model.sujets;
                  },
                  function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                 });
        }
        
        $scope.DetailsSujet = function (obj){
            $scope.dataObject = {};
            $scope.dataObject.Lab_form_title = "Détails";
            $scope.dataObject.Lab_libelle = obj.LibelleSujet;
            $scope.dataObject.Lab_typesujet = obj.type_sujet.LibelleTypeSujet;
            $scope.dataObject.Lab_etat = obj.LibelleEtat;
            $scope.dataObject.Lab_auteur = obj.structure_sujet.SigleStructure;
            $scope.dataObject.Lab_observations = obj.Observations;
    
            $('#DetailsSujetModal').modal('show');
        }    
})

ctrl.controller("ListeComCodirCtrl", function($sce,$window,$filter,FileUploader,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
            // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
             $http.get(server_urlcheckauth).success(function() {
                  $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
                  if($rootScope.UserConnected === null)
                      $state.go('login');
                  }).error(function(error) {
                      $state.go('login');
              });
        
              $rootScope.titrepage = "Liste des communications";
        
              $scope.table = {};
        
                var getListCom = function () {
                    $scope.table.isSearching = true;
                    Model.getListComCodir()
                    .then(function () {
                        $scope.communications = Model.communications;
                        $scope.table.isSearching = false;
                    }, function (error) {
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
                }
                getListCom();
    
                var getListStructure = function () {
                    Model.getListStructure()
                    .then(function () {
                        $scope.structures = Model.structures;
                    }, function (error) {
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
                }
                getListStructure();

                var getListCodirOuvert = function () {
                    Model.getListCodirOuvert()
                    .then(function () {
                        $scope.codirouvert = Model.codirouvert;
                    }, function (error) {
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
                }
                getListCodirOuvert();

                

                $scope.etats = [
                    {'id_etat':1,'lib_etat':'Enregistrer'},
                    {'id_etat':2,'lib_etat':'Envoyer'}
                ];

                $scope.actions = [
                    {'id_etat':1,'lib_etat':'Inscrire'},
                    {'id_etat':2,'lib_etat':'Désincrire'}
                ];
                
                        // Gestion de l'envoi des fichiers sur le serveur
                          var uploader = $scope.uploader = new FileUploader({
                              url: server_url + 'codir/communication',
                              method: 'POST',
                              headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
                          });
                  
                          // Add metadata to form for retrieve there on server
                          uploader.onBeforeUploadItem = function(item) {
                            
                            if($scope.dataObject.id !=0) {
                                item.url =  $scope.uploader.url + "/" + $scope.dataObject.id;
                            }
                                item.formData.push($scope.params);
                          };
                  
                          // Filtre
                          var supportedFileFormat = [
                              'application/pdf'
                                      ];
                          uploader.filters.push({
                              name: 'filtrefile',
                              fn: function(item,options) {
                                      if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                                          {
                                              if(item.size <= 5242880)  return true; // <--5 Mo //  1048576(o) = 1Mo = 1024 * 1024 (1o)
                                          }      
                                      return false;
                              }
                          });
                  
                          uploader.onAfterAddingFile = function(fileItem) {
                              $scope.errorform = false;
                              $scope.ctrlmessage = "";
                          };
                  
                        uploader.onWhenAddingFileFailed = function(item, filter, options) {
                            $scope.showUploadButton = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
                          }
                        uploader.onSuccessItem = function(item, response,status,headers) {
                            if(status == 200) {
                                $scope.successform = true;
                                $scope.communications = response;
                                $scope.dataObject.submit = false;
                                $scope.successform = true;
                                $scope.ctrlmessage = "Enregistrement effectué !";
                                $('#AddEditComCodirModal').modal('hide');
                                uploader.clearQueue();
                            }
                            else {
                                $scope.dataObject.submit = false;
                                $scope.errorform = true;
                                $scope.ctrlmessage = response.message;
                                if(response.data.error == 'token_not_provided') {
                                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                    $state.go('login');
                                }
                            }  
                        }
                      uploader.onErrorItem = function (item, response,status,headers) {
                          $scope.ctrlmessage = response.message;
                          $scope.dataObject.submit = false;
                          $scope.errorform = true;
                      }
                    

                      $scope.refreshState = function (){
                        $state.reload();
                    }

                $scope.filterListe = function (item) {
                    if($rootScope.UserConnected.ProfilCodir == 4 || $rootScope.UserConnected.ProfilCodir == 5){
                        if(item.EtatCom == 1) return false;
                    }
                    return true;
                }
    
                // POPUP
                $scope.formComCodir = function(modalstate,obj) {
                $scope.modalstate = modalstate;
                $scope.ctrlmessage = '';
                $scope.errorform = false;
                $scope.successform = false;
        
                $scope.dataObject = {};
                uploader.clearQueue();
                document.getElementById('fileupload').value = null;
        
                switch(modalstate) {
                    case 'add' :
                        $scope.dataObject.form_title = "Ajouter une communication";
                        $scope.dataObject.id = 0;
                        $scope.dataObject.reference = '';
                        $scope.dataObject.origine = '';
                        $scope.dataObject.titre = '';
                        $scope.dataObject.structure_affecte = {};
                        $scope.dataObject.etat = {};
                        $('#AddEditComCodirModal').modal('show');
                        break;
        
                    case 'edit':
                        $scope.dataObject.form_title = "Modifier une communication";
                        $scope.dataObject.id = obj.IdCommunication;
                        $scope.dataObject.reference = obj.Reference;
                        $scope.dataObject.origine = obj.Origine;
                        $scope.dataObject.titre = obj.Titre;
                        $scope.dataObject.structure_affecte = $filter('filter')($scope.structures, {'IdStructure': Utilitaire.convertToInt(obj.IdStructureAffecte)},true)[0];
                        $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt(obj.EtatCom)},true)[0];
                        $('#AddEditComCodirModal').modal('show');
                        break;

                    case 'details':
                        //$scope.dataObject = {};
                        var etat_com = '';
                        switch (obj.EtatCom) {
                            case 1:
                                etat_com = "Enregistré";
                                break;
                            case 2:
                                etat_com = "Envoyé à la structure";
                                break;
                            case 3:
                                etat_com = "En cours de traitement";
                                break;
                            case 4:
                                etat_com = "Traité";
                                break;
                        
                            default:
                                etat_com = "Non défini";
                                break;
                        }
                        $scope.dataObject.form_title = "Détails";
                        $scope.dataObject.Lab_reference = obj.Reference;
                        $scope.dataObject.Lab_origine = obj.Origine;
                        $scope.dataObject.Lab_titre = obj.Titre;
                        $scope.dataObject.Lab_structure_affecte = obj.structure_traitant.SigleStructure;
                        $scope.dataObject.Lab_etat = etat_com;
                        $('#DetailsComCodirModal').modal('show');
                        break;

                    case 'process':
                        $scope.dataObject.form_title = "Traité la communication";
                        $scope.dataObject.id = obj.IdCommunication;
                        $scope.dataObject.rappel_contenu = obj.RappelContenu;
                        $scope.dataObject.analyse =  obj.Analyse;
                        $scope.dataObject.consultation =  obj.Consultation;
                        $scope.dataObject.conclusion =  obj.Conclusion;
                        $('#AddProcessComModal').modal('show');
                        break;

                    case 'signin':
                        $scope.dataObject.form_title = "Inscrire ou désincrire la com. au prochain codir";
                        $scope.dataObject.id = obj.IdCommunication;
                        $scope.dataObject.sig_reference = obj.Reference;
                        $scope.dataObject.sig_origine =  obj.Origine;
                        $scope.dataObject.sig_titre =  obj.Titre;
                        $scope.dataObject.lib_nextcodir = $scope.codirouvert[0].LibelleCodir;
                        $scope.dataObject.action = $scope.actions[0];
                        $('#SigninComModal').modal('show');
                        break;
                    default : 
                        break;
                }
            }
    
            if($stateParams.add != null) {
                $scope.formComCodir('add',0);
            }
        
            $scope.resetError = function () {
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
            }
        
            $scope.errorform = false;
        
            $scope.saveComCodir = function (){
                    $scope.dataObject.submit = true;
                    $scope.errorform = false;
                    $scope.successform = false;
                    $scope.ctrlmessage = "";
        
                    $scope.params = {
                        current_module_id : $rootScope.UserConnected.current_module_id,
                        after_done:1,
                        md: $scope.modalstate,
                        IdCommunication:$scope.dataObject.id,
                        EtatCom:$scope.dataObject.etat.id_etat,
                        Reference:$scope.dataObject.reference,
                        Origine:$scope.dataObject.origine,
                        Titre:$scope.dataObject.titre,
                        IdStructureAffecte:$scope.dataObject.structure_affecte.IdStructure
                    }
                    if(uploader.queue.length > 0) {
                        uploader.uploadAll();
                    }else {
                        if($scope.params.md == 'add') {
                            $scope.dataObject.submit = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = "Vous devez joindre le fichier de traitement de la communication";
                            return;
                        }
                        Model.saveComCodir($scope.params)
                        .then(function () {
                            $scope.communications = Model.communications;
                            $scope.dataObject.submit = false;
                            $scope.successform = true;
                            $scope.ctrlmessage = "Enregistrement effectué !";
                            $('#AddEditComCodirModal').modal('hide');
                        }, function (error) {
                            $scope.dataObject.submit = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = error.data.message;
                            if(error.data.error == 'token_not_provided') {
                                $('#AddEditComCodirModal').modal('hide');
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            }
                        });
                    }
            }
        
             // SUPPRIMER
            $scope.dropComCodir = function(o) {
        
                var msgConfirm = "Voulez-vous supprimer la communication " + o.Reference + " ?";
                var confirmResult = confirm(msgConfirm);
                if (confirmResult === false) return;
        
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1
                };
        
                Model.dropComCodir(o.IdCommunication,params)
                    .then(
                      function () {
                        $scope.communications = Model.communications;
                      },
                      function (error) { 
                            $scope.ctrlmessage = error.data.message;
                            if(error.data.error == 'token_not_provided') {
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            } 
                     });
            }

            $scope.saveSigninCodir = function () {
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    md: $scope.modalstate,
                    IdCommunication:$scope.dataObject.id,
                    IdCodir:$scope.codirouvert[0].IdCodir,
                    Action:$scope.dataObject.action.id_etat
                }
    
                Model.saveInscripComCodir(params)
                    .then(function () {
                        $scope.communications = Model.communications;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                        //$('#SigninComModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#SigninComModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
            }
})

ctrl.controller("TraiterComCodirCtrl", function($sce,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    $rootScope.titrepage = "Traitement de la communication";

    $scope.etats = [
        {'id_etat':3,'lib_etat':'En cours de traitement'},
        {'id_etat':4,'lib_etat':'Traité'}
    ];

    $scope.dataObject = {};
    $scope.dataObject.id = $stateParams.communication.IdCommunication;
    $scope.dataObject.reference = $stateParams.communication.Reference;
    $scope.dataObject.origine = $stateParams.communication.Origine;
    $scope.dataObject.titre = $stateParams.communication.Titre;

    $scope.dataObject.rappel_contenu = $stateParams.communication.RappelContenu;
    $scope.dataObject.analyse = $stateParams.communication.Analyse;
    $scope.dataObject.consultation = $stateParams.communication.Consultation;
    $scope.dataObject.conclusion = $stateParams.communication.Conclusion;
    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt($stateParams.communication.EtatCom)},true)[0];

    $scope.saveProcess = function (){
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            after_done:0,
            IdCommunication:$scope.dataObject.id,
            EtatCom:$scope.dataObject.etat.id_etat,
            RappelContenu:$scope.dataObject.rappel_contenu,
            Analyse:$scope.dataObject.analyse,
            Consultation:$scope.dataObject.consultation,
            Conclusion:$scope.dataObject.conclusion
        }

        Model.saveProcessComCodir(params)
        .then(function () {
            $scope.dataObject.submit = false;
            $scope.successform = true;
            $scope.ctrlmessage = "Enregistrement effectué !";
        }, function (error) {
            $scope.dataObject.submit = false;
            $scope.errorform = true;
            $scope.ctrlmessage = error.data.message;
            if(error.data.error == 'token_not_provided') {
                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                $state.go('login');
            }
        });
    }

    $scope.resetError = function () {
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";
    }

})

ctrl.controller("DetailsComCodirCtrl", function($sce,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    $rootScope.titrepage = "Détails de la communication pour traitement";

    $scope.etats = [
        {'id_etat':3,'lib_etat':'En cours de traitement'},
        {'id_etat':4,'lib_etat':'Traité'}
    ];

    $scope.dataObject = {};
    $scope.dataObject.id = $stateParams.communication.IdCommunication;
    $scope.dataObject.reference = $stateParams.communication.Reference;
    $scope.dataObject.origine = $stateParams.communication.Origine;
    $scope.dataObject.titre = $stateParams.communication.Titre;

    $scope.dataObject.rappel_contenu = $stateParams.communication.RappelContenu;
    $scope.dataObject.analyse = $stateParams.communication.Analyse;
    $scope.dataObject.consultation = $stateParams.communication.Consultation;
    $scope.dataObject.conclusion = $stateParams.communication.Conclusion;
    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt($stateParams.communication.EtatCom)},true)[0];

})

ctrl.controller("ListeCodirCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
            // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
             $http.get(server_urlcheckauth).success(function() {
                  $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
                  if($rootScope.UserConnected === null)
                      $state.go('login');
                  }).error(function(error) {
                      $state.go('login');
              });
        
              $rootScope.titrepage = "Liste des codirs";
        
              $scope.table = {};
        
                var getListCodir = function () {
                    $scope.table.isSearching = true;
                    Model.getListCodir()
                    .then(function () {
                        $scope.codirs = Model.codirs;
                        $scope.table.isSearching = false;
                    }, function (error) {
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
                }
                getListCodir();

                var getListPoste = function () {
                    Model.getListPoste()
                        .then(function () {
                            $scope.postes = Model.postes;
                        }, function (error) {
                            if(error.data.error == 'token_not_provided') {
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            }
        
                      });
                }
                getListPoste();

                $scope.listedroitsuser = function (item){
                    if($rootScope.showmenu.MenuCodirCommentOnly) {
                        if(item.EtatCodir == 1) return false;
                    }
                    return true;
                }
    
                // PREREMPLIR LES PROFILS
                $scope.etats = [
                    {'id_etat':1,'lib_etat':'Attente'},
                    {'id_etat':2,'lib_etat':'Ouvert'}
                ];

                $scope.statusabsence = [
                    {'id':1,'label':'Enregistrer'},
                    {'id':2,'label':'Valider'},
                    {'id':3,'label':'Annuler'}
                ];

                    
                    $scope.dataObject = {};

                    //moment.locale('fr');
                    $scope.refreshState = function (){
                        $state.reload();
                    }

                    $scope.endDateOnSetTime = endDateOnSetTime;
                    $scope.startDateOnSetTime = startDateOnSetTime;

                    $scope.startDateBeforeRenderPast = startDateBeforeRenderPast;
                    $scope.startDateBeforeRenderPastDemar = startDateBeforeRenderPastDemar;

                    function startDateBeforeRenderPast($dates) {
                        const todaySinceMidnight = new Date();
                          todaySinceMidnight.setUTCHours(0,0,0,0);
                          $dates.filter(function (date) {
                            return date.utcDateValue < todaySinceMidnight.getTime();
                          }).forEach(function (date) {
                            date.selectable = false;
                          });
                      };

                      function startDateBeforeRenderPastDemar($dates) {
                        const todaySinceMidnight = new Date();
                          todaySinceMidnight.setUTCHours(23,59,0,0);
                          $dates.filter(function (date) {
                            return date.utcDateValue > todaySinceMidnight.getTime();
                          }).forEach(function (date) {
                            date.selectable = false;
                          });
                      }

                    function startDateOnSetTime () {
                      $scope.$broadcast('start-date-changed');
                    }
                    
                    function endDateOnSetTime () {
                      $scope.$broadcast('end-date-changed');
                    }
                    
                    
                // POPUP
                $scope.formCodir = function(modalstate,obj) {
                $scope.modalstate = modalstate;
                $scope.ctrlmessage = '';
                $scope.errorform = false;
                $scope.successform = false;
        
                $scope.dataObject = {};

                $scope.$watch('dataObject.dateheureprevue', function (newVal, oldVal) { 
                    $scope.dataObject.libelle = 'Codir du ' + $filter('date')($scope.dataObject.dateheureprevue,'dd / MM / yyyy');
                 }, true);

                switch(modalstate) {
                    case 'add' :
                        $scope.dataObject.form_title = "Ajouter un codir";
                        $scope.dataObject.id = 0;
                        $scope.dataObject.dateheureprevue = '';
                        $scope.dataObject.dateheuretenue = '';
                        $scope.dataObject.presidepar = {};
                        $scope.dataObject.etat = {};
                        $scope.dataObject.lieu = '';
                        
                        break;
        
                    case 'edit':
                        $scope.dataObject.form_title = "Modifier un codir";
                        $scope.dataObject.id = obj.IdCodir;
                        $scope.dataObject.dateheureprevue = obj.DateHeurePrevue;
                        if(obj.DateHeureTenue!="0000-00-00 00:00:00") $scope.dataObject.dateheuretenue = obj.DateHeureTenue;
                        else $scope.dataObject.dateheuretenue = '';
                        $scope.dataObject.presidepar = {};
                        if(obj.president_codir != null) $scope.dataObject.presidepar =  $filter('filter')($scope.postes, {'IdPoste': obj.president_codir.IdPoste},true)[0];
                        $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': Utilitaire.convertToInt(obj.EtatCodir)},true)[0];
                        $scope.dataObject.lieu = obj.LieuCodir;
                        break;
        
                    default : 
                        break;
                }
        
                $('#AddEditCodirModal').modal('show');
            }

            $scope.AbsenceCodir =  function (obj) {
                $scope.dataObject = {};
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                $scope.dataObject.LibelleCodir = obj.LibelleCodir;
                $scope.dataObject.IdCodir = obj.IdCodir;
                $scope.dataObject.IdStructure = $rootScope.UserConnected.IdStructure;
                $scope.dataObject.IdResponsable = $rootScope.UserConnected.IdUtilisateur;
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    IdCodir:obj.IdCodir,
                    IdStructure:$rootScope.UserConnected.IdStructure,
                    IdResponsable:$rootScope.UserConnected.IdUtilisateur
                }
                Model.getAbsenceCodirRep(params)
                .then(function () {
                    $scope.absence = Model.absence;
                    if($scope.absence.length > 0) {
                        $scope.dataObject.md = 'edit';
                        $scope.dataObject.Statut = $filter('filter')($scope.statusabsence,{'id':$scope.absence[0].Statut},true)[0];
                        $scope.dataObject.NomRepresentant = $scope.absence[0].NomRepresentant;
                        $scope.dataObject.MotifAbsence = $scope.absence[0].MotifAbsence;
                        $scope.dataObject.form_title = "Modifier le signalement de votre absence au codir";
                    }else {
                        $scope.dataObject.md = 'add';
                        $scope.dataObject.Statut = {};
                        $scope.dataObject.NomRepresentant = '';
                        $scope.dataObject.MotifAbsence = '';
                        $scope.dataObject.form_title = "Signaler votre absence au codir";
                    }

                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
                $('#AbsenceCodirModal').modal('show');
            }

            if($stateParams.add != null) {
                $scope.formCodir('add',0);
            }

            $scope.startCodir = function(obj){
                $scope.dataObject = {};
                $scope.dataObject.id =obj.IdCodir;
                $scope.dataObject.Lab_form_title = "Démarrer le codir";
                $scope.dataObject.Lab_libelle = obj.LibelleCodir;

                if(obj.DateHeureTenue!="0000-00-00 00:00:00") $scope.dataObject.dateheuretenue = obj.DateHeureTenue;
                else $scope.dataObject.dateheuretenue = '';
                $scope.dataObject.presidepar = {};
                if(obj.president_codir != null) $scope.dataObject.presidepar =  $filter('filter')($scope.postes, {'IdPoste': obj.president_codir.IdPoste},true)[0];
                $scope.dataObject.lieu = obj.LieuCodir;
                $('#startCodirModal').modal('show');
            }
        
            $scope.resetError = function () {
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
            }
        
            $scope.errorform = false;
        
            $scope.saveCodir = function (){
                    $scope.dataObject.submit = true;
                    $scope.errorform = false;
                    $scope.successform = false;
                    $scope.ctrlmessage = "";

                    var president_codir = 0;
                    if($scope.dataObject.presidepar =='' 
                        || angular.equals($scope.dataObject.presidepar,{}) 
                        || $scope.dataObject.presidepar===undefined 
                        || $scope.dataObject.presidepar===null ){
                        president_codir = 0;
                    }
                    else {
                        president_codir = $scope.dataObject.presidepar.IdPoste;
                    }
        
                    var params = {
                        current_module_id : $rootScope.UserConnected.current_module_id,
                        after_done:1,
                        md: $scope.modalstate,
                        IdCodir:$scope.dataObject.id,
                        LibelleCodir:$scope.dataObject.libelle,
                        DateHeurePrevue:$filter('date')($scope.dataObject.dateheureprevue,'yyyy-MM-dd HH:mm:00'),
                        DateHeureTenue:$filter('date')($scope.dataObject.dateheuretenue,'yyyy-MM-dd HH:mm:00'),
                        PresidePar:president_codir,
                        EtatCodir:$scope.dataObject.etat.id_etat,
                        LieuCodir:$scope.dataObject.lieu
                    }
                    Model.saveCodir(params)
                        .then(function () {
                            $scope.codirs = Model.codirs;
                            $scope.dataObject.submit = false;
                            $scope.successform = true;
                            $scope.ctrlmessage = "Enregistrement effectué !";
                            $('#AddEditCodirModal').modal('hide');
                        }, function (error) {
                            $scope.dataObject.submit = false;
                            $scope.errorform = true;
                            $scope.ctrlmessage = error.data.message;
                            if(error.data.error == 'token_not_provided') {
                                $('#AddEditCodirModal').modal('hide');
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            }
                        });
            }

            $scope.saveStartCodir = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    IdCodir:$scope.dataObject.id,
                    DateHeureTenue:$filter('date')($scope.dataObject.dateheuretenue,'yyyy-MM-dd HH:mm:00'),
                    PresidePar:$scope.dataObject.presidepar.IdPoste,
                    LieuCodir:$scope.dataObject.lieu
                }
                Model.saveStartCodir(params)
                    .then(function () {
                        $scope.codirs = Model.codirs;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Le codir a été démarré !";
                        //$('#startCodirModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#startCodirModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
            }

            $scope.saveAbsenceRepCodir = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    state:$scope.dataObject.md,
                    IdCodir:$scope.dataObject.IdCodir,
                    IdStructure:$scope.dataObject.IdStructure,
                    Statut:$scope.dataObject.Statut.id,
                    IdResponsable:$scope.dataObject.IdResponsable,
                    NomRepresentant:$scope.dataObject.NomRepresentant,
                    MotifAbsence:$scope.dataObject.MotifAbsence
                }

                Model.saveAbsenceRepCodir(params)
                    .then(function () {
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Votre absence a été enregistrée dans le système.";
                        $('#AbsenceCodirModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
            }
        
            // SUPPRIMER
            $scope.dropCodir= function(o) {
        
                var msgConfirm = "Voulez-vous supprimer le codir " + o.LibelleCodir + " ?";
                var confirmResult = confirm(msgConfirm);
                if (confirmResult === false) return;
        
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1
                };
        
                Model.dropCodir(o.IdCodir,params)
                    .then(
                      function () {
                              $scope.codirs = Model.codirs;
                      },
                      function (error) { 
                            $scope.ctrlmessage = error.data.message;
                            if(error.data.error == 'token_not_provided') {
                                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                                $state.go('login');
                            } 
                     });
            }
            
            $scope.DetailsCodir = function (obj){
                $scope.dataObject = {};
                $scope.dataObject.Lab_form_title = "Détails";
                $scope.dataObject.Lab_libelle = obj.LibelleCodir;
                $scope.dataObject.Lab_dhprevue = obj.DateHeurePrevue;
                if(obj.DateHeureTenue!="0000-00-00 00:00:00") $scope.dataObject.Lab_dhtenue = obj.DateHeureTenue;
                else $scope.dataObject.Lab_dhtenue = '';
                if(obj.poste_president_codir ==null || obj.user_president_codir == null) $scope.dataObject.Lab_presidepar = '';
                else $scope.dataObject.Lab_presidepar = '('+ obj.poste_president_codir.LibellePoste +') ' +  obj.user_president_codir.Nom + obj.user_president_codir.Prenoms;
                $scope.dataObject.Lab_etat = obj.LibelleEtat;
                $scope.dataObject.Lab_lieu = obj.LieuCodir;
        
                $('#DetailsCodirModal').modal('show');
            }
})

ctrl.controller("ListeCodirCourantCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
            // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
             $http.get(server_urlcheckauth).success(function() {
                  $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
                  if($rootScope.UserConnected === null)
                      $state.go('login');
                  }).error(function(error) {
                      $state.go('login');
              });
        
              $rootScope.titrepage = "Codir courant";
        
              $scope.table = {};
        
                var getListCodirCourant = function () {
                    $scope.table.isSearching = true;
                    Model.getListCodirCourant()
                    .then(function () {
                        $scope.codirs = Model.codirs;
                        $scope.table.isSearching = false;
                    }, function (error) {
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
                }
                getListCodirCourant();
    
                $scope.dataObject = {};

                
                $scope.refreshState = function (){
                    $state.reload();
                }
        
                $scope.resetError = function () {
                    $scope.errorform = false;
                    $scope.successform = false;
                    $scope.ctrlmessage = "";
                }

})

ctrl.controller("CommentCodirCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
        $http.get(server_urlcheckauth).success(function() {
            $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
            if($rootScope.UserConnected === null)
                $state.go('login');
            }).error(function(error) {
                $state.go('login');
        });

        $scope.thiscodir = $stateParams.codir;
        if($scope.thiscodir == null) $state.go('app.codir.codir.liste');

        $rootScope.titrepage = "Commentaires sur les sujets/communications du " + $scope.thiscodir.LibelleCodir;

        $scope.tablecommunications = {};
        $scope.tablesujets = {};

        $scope.tablecommunications.isSearching = true;
        $scope.tablesujets.isSearching = true;

        var getListComOneCodir = function () {
            Model.getListComOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablecommunications.isSearching = false;
                    $scope.communications = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListComOneCodir();

        var getListSujetOneCodir = function () {
            Model.getListSujetOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablesujets.isSearching = false;
                    $scope.sujets = Model.sujets;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListSujetOneCodir();

        // PREREMPLIR LES PROFILS
        $scope.etats = [
            {'id_etat':1,'lib_etat':'Attente'},
            {'id_etat':2,'lib_etat':'Valider'}
        ];

        // Filtre sur commentaire
        $scope.setUserStructureComment = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==1) return true;
            return false;
        }

        $scope.setUserStructureCommentView = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==2) return true;
            return false;
        }

        $scope.checkAddComment = function(com,comments){
            if(comments.length > 0){
                if($filter('filter')(comments,{'IdCom':com.IdCommunication,
                    'IdStructure':$rootScope.UserConnected.IdStructure
                    },true)[0] != undefined ) return false;
            }
            return true;
        }

        // Filtre sur les sujets
        $scope.setUserStructureCommentSujet = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==1) return true;
            return false;
        }

        $scope.setUserStructureCommentViewSujet = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==2) return true;
            return false;
        }

        $scope.checkAddCommentSujet = function(com,comments){
            if(comments.length > 0){
                if($filter('filter')(comments,{'IdSujet':com.IdSujet,
                    'IdStructure':$rootScope.UserConnected.IdStructure
                    },true)[0] != undefined ) return false;
            }
            return true;
        }


        $scope.dataObject = {};

        // POPUP
        $scope.formCommentCom = function(modalstate,com,comment) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter une observation sur la communication";
                    $scope.dataObject.id_com = com.IdCommunication;
                    $scope.dataObject.titrecom = com.Titre;
                    $scope.dataObject.observation = '';
                    $scope.dataObject.etat = {};
                    
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier une observation sur la communication";
                    $scope.dataObject.id_com = com.IdCommunication;
                    $scope.dataObject.titrecom = com.Titre;
                    $scope.dataObject.observation = comment.Observations;
                    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': comment.Etat},true)[0];
                    break;
    
                default : 
                    break;
            }
            $('#observatComModal').modal('show');
        }

        $scope.formCommentSujet = function(modalstate,suj,comment) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter une observation sur le sujet";
                    $scope.dataObject.id_sujet = suj.IdSujet;
                    $scope.dataObject.titresujet = suj.LibelleSujet;
                    $scope.dataObject.observation = '';
                    $scope.dataObject.etat = {};
                    
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier une observation sur le sujet";
                    $scope.dataObject.id_sujet = suj.IdSujet;
                    $scope.dataObject.titresujet = suj.LibelleSujet;
                    $scope.dataObject.observation = comment.Observations;
                    $scope.dataObject.etat = $filter('filter')($scope.etats, {'id_etat': comment.Etat},true)[0];
                    break;
    
                default : 
                    break;
            }
            $('#observatSujetModal').modal('show');
        }

        $scope.detailsCommentCom = function (com,comment){
            $scope.dataObject = {};
            $scope.dataObject.Lab_form_title = "Visualisation de votre observation";
            $scope.dataObject.Lab_titre = com.Titre;
            $scope.dataObject.Lab_observation = comment.Observations;
            $('#detailsCommentCom').modal('show');
        }

        $scope.detailsCommentSujet = function (suj,comment){
            $scope.dataObject = {};
            $scope.dataObject.Lab_form_title = "Visualisation de votre observation";
            $scope.dataObject.Lab_titre = suj.LibelleSujet;
            $scope.dataObject.Lab_observation = comment.Observations;
            $('#detailsCommentSujet').modal('show');
        }
    
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveObservationCom = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:2,
                    IdCodir:$scope.thiscodir.IdCodir,
                    IdCommunication:$scope.dataObject.id_com,
                    IdStructure:$rootScope.UserConnected.IdStructure,
                    Etat:$scope.dataObject.etat.id_etat,
                    Observations:$scope.dataObject.observation
                }
                Model.saveObservationCom(params)
                    .then(function () {
                        $scope.communications = Model.communications;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Enregistrement effectué !";
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#observatSujetModal').modal('hide');            
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }

        $scope.saveObservationSujet = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:2,
                IdCodir:$scope.thiscodir.IdCodir,
                IdSujet:$scope.dataObject.id_sujet,
                IdStructure:$rootScope.UserConnected.IdStructure,
                Etat:$scope.dataObject.etat.id_etat,
                Observations:$scope.dataObject.observation
            }
            Model.saveObservationSujet(params)
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
    }
    
})

ctrl.controller("ListePresenceCodirCourantCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
        $http.get(server_urlcheckauth).success(function() {
            $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
            if($rootScope.UserConnected === null)
                $state.go('login');
            }).error(function(error) {
                $state.go('login');
        });

        $scope.thiscodir = $stateParams.codir;
        if($scope.thiscodir == null) $state.go('app.codir.codir.managecurrent');

        $rootScope.titrepage = "Liste de présence au " + $scope.thiscodir.LibelleCodir;

        $scope.tablepresences = {};
        $scope.tablestructattendues = {};
        $scope.tablesignalabsences = {};
        $scope.haveExpectedList = false;
        $scope.havePresenceList = false;

        //$scope.selectedStruct = {};
        $scope.selectAllPresence = false;
        var getListPresenceCodir = function () {
            $scope.tablepresences.isSearching = true;
            Model.getListPresenceCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablepresences.isSearching = false;
                    $scope.presences = Model.presences;
                    if($scope.presences.length > 0) {
                        $scope.havePresenceList = true;
                        if($scope.presences[0].IsValid == 1) $scope.listPresenceValid = true;
                        else $scope.listPresenceValid = false;
                    }
                    if(!$scope.listPresenceValid) {
                        var checkAllPresenceIs = 0;
                        angular.forEach($scope.presences, function(pres) {
                            if(pres.Statut == 1 ) {
                                pres.select = true;
                                checkAllPresenceIs++;
                            }
                            else pres.select = false;
                        });
                        if($scope.presences.length == checkAllPresenceIs && checkAllPresenceIs!=0) {
                            $scope.selectAllPresence = true;
                        }
                    }
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListPresenceCodir();
        
        var getListPresenceStandardAttenduCodir = function () {
            $scope.tablestructattendues.isSearching = true;
            Model.getListPresenceStandardAttenduCodir()
                .then(function () {
                    $scope.tablestructattendues.isSearching = false;
                    $scope.structuresattendues = Model.structures;
                    angular.forEach($scope.structuresattendues, function(struc) {
                        struc.select = true;
                      });
                    $scope.haveExpectedList = true;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }

        $scope.haveSignalAbsence = false;
        var getListSignalAbsencesCodir = function () {
            $scope.tablesignalabsences.isSearching = true;
            Model.getListSignalAbsencesCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablesignalabsences.isSearching = false;
                    $scope.signalabsences = Model.signalabsences;
                    if($scope.signalabsences.length > 0) $scope.haveSignalAbsence = true;
                    else $scope.haveSignalAbsence = false;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListSignalAbsencesCodir();

        var saveListStructureAttendu = function () {
            var structures_id = [];
            angular.forEach($scope.structuresattendues, function(value,i) {
                if(value.select)  structures_id.push(value.IdStructure);
            });

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                IdCodir:$scope.thiscodir.IdCodir,
                IdStructures:structures_id
            }
            Model.saveListStructureAttendu(params)
                .then(function () {
                    $scope.presences = Model.presences;
                    if($scope.presences.length > 0) $scope.havePresenceList = true;
                    var checkAllPresenceIs = 0;
                    angular.forEach($scope.presences, function(pres) {
                        if(pres.Statut == 1 ) {
                            pres.select = true;
                            checkAllPresenceIs++;
                        }
                        else pres.select = false;
                    });
                    if($scope.presences.length == checkAllPresenceIs && checkAllPresenceIs!=0) {
                        $scope.selectAllPresence = true;
                    }
                    $scope.tablepresences.isSearching = false;
                    $scope.havePresenceList = true;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        $scope.listPresenceValid = false;
        $scope.savePresenceList = function (state) {
            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                IsValid:state,
                IdCodir:$scope.thiscodir.IdCodir,
                presences:$scope.presences
            }
            Model.savePresenceList(params)
                .then(function () {
                    $scope.presences = Model.presences;
                    $scope.havePresenceList = true;
                    if($scope.presences.length > 0){
                        $scope.havePresenceList = true;
                        if($scope.presences[0].IsValid == 1) $scope.listPresenceValid = true;
                        else $scope.listPresenceValid = false;
                    }
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                    
              });
        }

        var getListStructure = function () {
            Model.getListStructure()
                .then(function () {
                    $scope.structures = Model.structures;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListStructure();

        var getListUtilisateur = function () {
            Model.getListUtilisateur()
                .then(function () {
                    $scope.utilisateurs = Model.utilisateurs;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
              });
        }
        getListUtilisateur();

        // PREREMPLIR LES PROFILS
        $scope.status = [
            {'id':1,'label':'Oui'},
            {'id':0,'label':'Non'}
        ];

        $scope.status2 = [
            {'id':1,'label':'Oui'},
            {'id':2,'label':'Non'}
        ];

        $scope.dataObject = {};
        $scope.generateListeStandard = function(){
            getListPresenceStandardAttenduCodir();
        }

        $scope.saveListAttendu = function(){
            saveListStructureAttendu();
        }

        /* Gestion tous cocher liste attendu */
        $scope.selectAll = true;
        $scope.checkAll = function () {
            if($scope.selectAll){
                $scope.selectAll = false;
            }else $scope.selectAll = true;
            angular.forEach($scope.structuresattendues, function(struc) {
                struc.select = $scope.selectAll;
            });
        }

        $scope.selectedOne = function (struc){
            if($scope.selectAll){
                $scope.selectAll = false;
            }else {
                var totalselected = 0;
                angular.forEach($scope.structuresattendues, function(struc) {
                    if(struc.select) totalselected++;
                });
                if($scope.structuresattendues.length == totalselected) $scope.selectAll = true;
            }
        }
        /* Fin gestion tous cocher liste attendu */


         /* Gestion tous cocher liste présences */
         $scope.checkAllPresence = function () {
             if($scope.selectAllPresence){
                 $scope.selectAllPresence = false;
             }else $scope.selectAllPresence = true;
             angular.forEach($scope.presences, function(pres) {
                 pres.select = $scope.selectAllPresence;
             });
         }
 
         $scope.selectedOnePresence = function (){
             if($scope.selectAllPresence){
                 $scope.selectAllPresence = false;
             }else {
                 var totalselectedPersonne = 0;
                 angular.forEach($scope.presences, function(pres) {
                     if(pres.select) totalselectedPersonne++;
                 });
                 if($scope.presences.length == totalselectedPersonne) $scope.selectAllPresence = true;
             }
         }
         /* Fin gestion tous cocher liste présences */

        // POPUP
        $scope.formPresenceCodir = function(modalstate,obj) {
            $scope.modalstate = modalstate;
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
            $scope.dataObject = {};
    
            switch(modalstate) {
                case 'add' :
                    $scope.dataObject.form_title = "Ajouter une présence au codir";
                    $scope.dataObject.id_presence = 0;
                    $scope.dataObject.structure = '';
                    $scope.dataObject.autreentite = '';
                    $scope.dataObject.personne = '';
                    $scope.dataObject.nom_personne = '';
                    $scope.dataObject.attendu = {};
                    $scope.dataObject.present = {};
                    $scope.dataObject.nom_representant = '';
                    $scope.dataObject.motifAbsence = '';
                    
                    break;
    
                case 'edit':
                    $scope.dataObject.form_title = "Modifier une absence au codir";
                    $scope.dataObject.id_presence = obj.id;
                    $scope.dataObject.id_codir = obj.IdCodir;
                    $scope.dataObject.structure = $filter('filter')($scope.structures,{'IdStructure':obj.IdStructure},true)[0];
                    $scope.dataObject.motif = obj.MotifAbsence;
                    $scope.dataObject.statut = $filter('filter')($scope.statuts,{'id':obj.Statut},true)[0];
                    $scope.dataObject.representrant = obj.Representant
                    break;
    
                default : 
                    break;
            }
            $('#PresenceCodirModal').modal('show');
        }
        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
        $scope.dataObject.required_rep = false;
        $scope.dataObject.statut = {};
        $scope.dataObject.representrant = '';
        $scope.required_structure = false;
        $scope.required_personne = false;
        $scope.required_represent = false;
        $scope.$watch('dataObject.structure', function (newVal, oldVal) { 
            if($scope.dataObject.structure =='' || angular.equals($scope.dataObject.structure, {}) || $scope.dataObject.structure ==null ){
                if($scope.dataObject.autreentite =='') $scope.required_structure = true;
                else $scope.required_structure = false;
            }else{
                $scope.required_structure = false;
            }
         }, true);

         $scope.$watch('dataObject.autreentite', function (newVal, oldVal) { 
            if($scope.dataObject.autreentite ==''){
                if($scope.dataObject.structure =='' || angular.equals($scope.dataObject.structure, {}) || $scope.dataObject.structure ==null ){
                    $scope.required_structure = true;
                }else $scope.required_structure = false;
            }else{
                $scope.required_structure = false;
            }
         }, true);

         $scope.$watch('dataObject.personne', function (newVal, oldVal) { 
            if($scope.dataObject.personne =='' || angular.equals($scope.dataObject.personne, {}) || $scope.dataObject.personne ==null ){
                if($scope.dataObject.nom_personne =='') $scope.required_personne = true;
                else $scope.required_personne = false;
            }else{
                $scope.required_personne = false;
            }
         }, true);

         $scope.$watch('dataObject.nom_personne', function (newVal, oldVal) { 
            if($scope.dataObject.nom_personne ==''){
                if($scope.dataObject.personne =='' || angular.equals($scope.dataObject.personne, {}) || $scope.dataObject.personne ==null ){
                    $scope.required_personne = true;
                }else $scope.required_personne = false;
            }else{
                $scope.required_personne = false;
            }
         }, true);

        $scope.$watch('dataObject.present', function (newVal, oldVal) {
            if($scope.dataObject.present !='' && !angular.equals($scope.dataObject.present, {}) && $scope.dataObject.present !=null ){ 
                if($scope.dataObject.present.id ==2){
                    if($scope.dataObject.motifAbsence=='') {
                        $scope.required_represent = true;
                    }else $scope.required_represent = false;
                }else $scope.required_represent = false;
            }else{
                $scope.required_represent = false;
            }
         }, true);

         $scope.$watch('dataObject.motifAbsence', function (newVal, oldVal) { 
            if($scope.dataObject.motifAbsence ==''){
                if($scope.dataObject.present !='' && !angular.equals($scope.dataObject.present, {}) && $scope.dataObject.present !=null ){ 
                    if($scope.dataObject.present.id ==1){
                        $scope.required_represent = false;
                    }else $scope.required_represent = true;
                }else $scope.required_represent = true;
            }else{
                $scope.required_represent = false;
            }
         }, true);
    
        $scope.saveNewPresenceStructure = function (){
                $scope.dataObject.submit = true;
                $scope.errorform = false;
                $scope.successform = false;
                $scope.ctrlmessage = "";

                var id_structure = 0;
                if($scope.dataObject.structure =='' 
                    || angular.equals($scope.dataObject.structure,{}) 
                    || $scope.dataObject.structure===undefined 
                    || $scope.dataObject.structure===null ){
                    id_structure = 0;
                }
                else {
                    id_structure = $scope.dataObject.structure.IdStructure;
                }

                var id_responsable = 0;
                if($scope.dataObject.personne =='' 
                    || angular.equals($scope.dataObject.personne,{}) 
                    || $scope.dataObject.personne===undefined 
                    || $scope.dataObject.personne===null ){
                    id_responsable = 0;
                }
                else {
                    id_responsable = $scope.dataObject.personne.IdUtilisateur;
                }
    
                var params = {
                    current_module_id : $rootScope.UserConnected.current_module_id,
                    after_done:1,
                    id:$scope.dataObject.id_presence,
                    IdCodir:$scope.thiscodir.IdCodir,
                    IdStructure:id_structure,
                    AutreStructure:$scope.dataObject.autreentite,
                    Statut:$scope.dataObject.present.id,
                    Attendu:$scope.dataObject.attendu.id,
                    IdResponsable:id_responsable,
                    NomResponsable:$scope.dataObject.nom_personne,
                    NomRepresentant:$scope.dataObject.nom_representant,
                    MotifAbsence:$scope.dataObject.motifAbsence
                }

                Model.saveNewPresenceStructure(params)
                    .then(function () {
                        $scope.presences = Model.presences;
                        if($scope.presences.length > 0) $scope.havePresenceList = true;
                        var checkAllPresenceIs2 = 0;
                        angular.forEach($scope.presences, function(pres) {
                            if(pres.Statut == 1 ) {
                                pres.select = true;
                                checkAllPresenceIs2++;
                            }
                            else pres.select = false;
                        });
                        if($scope.presences.length == checkAllPresenceIs2) $scope.selectAllPresence = true;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Participant ajouté à la liste de présence !";
                        $('#PresenceCodirModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $('#PresenceCodirModal').modal('hide');
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }

        $scope.saveObservationSujet = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:2,
                IdCodir:$scope.thiscodir.IdCodir,
                IdSujet:$scope.dataObject.id_sujet,
                IdStructure:$rootScope.UserConnected.IdStructure,
                Etat:$scope.dataObject.etat.id_etat,
                Observations:$scope.dataObject.observation
            }
            Model.saveObservationSujet(params)
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
    }
    
})

ctrl.controller("InscrireSujCodirCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
        $http.get(server_urlcheckauth).success(function() {
            $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
            if($rootScope.UserConnected === null)
                $state.go('login');
            }).error(function(error) {
                $state.go('login');
        });

        $scope.thiscodir = $stateParams.codir;
        if($scope.thiscodir == null) $state.go('app.codir.codir.liste');

        $rootScope.titrepage = "Inscription des sujets/communications au  " + $scope.thiscodir.LibelleCodir;

        $scope.trust = $sce.trustAsHtml;
        $scope.tablecommunications = {};
        $scope.tablecommunicationsprocess = true;
        $scope.tablesujets = {};
        $scope.tablesujetsdir = {};
        $scope.tablecominitpop = {};

        $scope.tablecommunications.isSearching = true;
        $scope.tablecommunicationsprocess.isSearching = true;
        $scope.tablesujets.isSearching = true;
        $scope.tablesujetsdir.isSearching = true;
        $scope.tablecominitpop.isSearching = true;

        var getListComOneCodir = function () {
            Model.getListComOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablecommunications.isSearching = false;
                    $scope.communications = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListComOneCodir();

        var getListSujetPropOneCodir = function () {
            Model.getListSujetPropOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablesujets.isSearching = false;
                    $scope.sujets = Model.sujets;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListSujetPropOneCodir();

        var getListComProcessCodir = function (){
            Model.getListComProcessCodir()
                .then(function () {
                    $scope.tablecommunicationsprocess.isSearching = false;
                    $scope.communicationsprocess = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListComProcessCodir();

        var getListSujetInsComDirection = function (){
            Model.getListSujetInsComDirection($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablesujetsdir.isSearching = false;
                    $scope.sujetsdir = Model.sujets;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListSujetInsComDirection();

        var getListComInitMinistPropOneCodir = function () {
            Model.getListComInitMinistPropOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablecominitpop.isSearching = false;
                    $scope.cominitministprop = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        getListComInitMinistPropOneCodir();

        $scope.statusSubInscComDir = {
            open:false
        }
        $scope.statusComInterMinist = {
            open:false
        }
        $scope.statusComInitMinist = {
            open:false
        }
        $scope.statusSubPropDir = {
            open:false
        }

        // PREREMPLIR LES PROFILS
        $scope.actions = [
            {'id_etat':1,'lib_etat':'Inscrire'},
            {'id_etat':2,'lib_etat':'Désinscrire'}
        ];

        $scope.refreshState = function (){
            $state.reload();
        }

        $scope.comwithoutlisted = function (com){
            if(com.inscrip_com_codir.length > 0){
                if($filter('filter')(com.inscrip_com_codir,{'IdCodir':$scope.thiscodir.IdCodir
                    },true) != undefined ) return false;
            }
            return true;
        }

        $scope.setUserStructureComment = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==1) return true;
            return false;
        }

        $scope.setUserStructureCommentView = function(comment){
            if(comment.IdStructure == $rootScope.UserConnected.IdStructure && comment.Etat ==2) return true;
            return false;
        }

        $scope.checkAddComment = function(com,comments){
            if(comments.length > 0){
                if($filter('filter')(comments,{'IdSujet':com.IdSujet,
                    'IdStructure':$rootScope.UserConnected.IdStructure
                    },true)[0] != undefined ) return false;
            }
            return true;
        }

        $scope.dataObject = {};

        // POPUP
        $scope.formAddComInscripCodir = function() {
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
            $scope.dataObject.submit = false;
            $scope.dataObject.form_title = "Inscrire la communication au codir";
            $('#AddInscripComCodir').modal('show');
        }

        $scope.formDesinscripComCodir = function(com) {
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
            $scope.dataObject.submit = false;
            $scope.dataObject.form_title = "Désinscrire la communication au codir";
            $scope.dataObject.id_com = com.IdCommunication;
            $scope.dataObject.titrecom = com.Titre;
            $('#DesinscripComCodir').modal('show');
        }

        $scope.formInscripSujetCodir = function(suj) {
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            $scope.dataObject.form_title = "Inscrire/Désinscrire le sujet au codir";
            $scope.dataObject.id_suj = suj.IdSujet;
            $scope.dataObject.suj_titre = suj.sujet.LibelleSujet;
            $scope.dataObject.action = $filter('filter')($scope.actions, {'id_etat': suj.Etat},true)[0];
            $('#InscripSujetCodir').modal('show');
        }

        $scope.formInscripComMinistCodir = function(com) {
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
    
            $scope.dataObject.form_title = "Inscrire/Désinscrire la com. au codir";
            $scope.dataObject.id_com = com.IdCommunication;
            $scope.dataObject.com_objet = com.communication_minist.Objet;
            $scope.dataObject.action = $filter('filter')($scope.actions, {'id_etat': com.Etat},true)[0];
            $('#InscripComMinistCodir').modal('show');
        }

        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }
    
        $scope.errorform = false;
    
        $scope.saveInscripComCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                IdCodir:$scope.thiscodir.IdCodir,
                IdCommunication:$scope.dataObject.communication.IdCommunication,
                Action:1
            }
            Model.saveInscripComCodir(params)
                .then(function () {
                    getListComOneCodir();
                    getListComProcessCodir();
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Inscription de la communication effectuée !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        $scope.saveDesinscripComCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                IdCodir:$scope.thiscodir.IdCodir,
                IdCommunication:$scope.dataObject.id_com,
                Action:2
            }
            Model.saveInscripComCodir(params)
                .then(function () {
                    getListComOneCodir();
                    getListComProcessCodir();
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Désinscription effectuée !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        $scope.formAddSujInscripCodir = function (){
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
            $scope.dataObject = {};

            $scope.dataObject.form_title = "Ajouter un sujet à inscrire au codir";
            $scope.dataObject.id = 0;
            $scope.dataObject.libelle = '';
            $scope.dataObject.typesujet = '';
            $scope.dataObject.observations = '';
    
            $('#AddEditSujetModal').modal('show');
        }

        $scope.saveInscripSujetCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                IdCodir:$scope.thiscodir.IdCodir,
                IdSujet:$scope.dataObject.id_suj,
                Action:$scope.dataObject.action.id_etat
            }
            Model.saveInscripSujetCodir(params)
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        $scope.saveInscripComInitMinCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1,
                IdCodir:$scope.thiscodir.IdCodir,
                IdCommunication:$scope.dataObject.id_com,
                Action:$scope.dataObject.action.id_etat
            }
            Model.saveInscripComInitMinCodir(params)
                .then(function () {
                    $scope.cominitministprop = Model.communications;
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Enregistrement effectué !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        /* Pour l'inscription des sujets au codir par le comité de direction */
        $scope.filterTypeSujetByProfil = function (item){
            if(item.ProfilsAcces !='') {
                var tab_profils = item.ProfilsAcces.split('-');
                var count_prof = 0;
                angular.forEach(tab_profils,function (value,i){
                    if(value !='') {
                        if($rootScope.UserConnected.ProfilCodir == value) {
                            count_prof++;
                        }
                    }
                });
                if(count_prof > 0) return true;
                return false;
            }
            return true;
        }

        var getListTypeSujet = function () {
            Model.getListTypeSujetCodir()
            .then(function () {
                $scope.typessujet = Model.typessujet;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
        }
        getListTypeSujet();

        $scope.setLibelleSujet = function (){
            var type_selected = $scope.dataObject.typesujet;
            if(type_selected.Generique == 1) {
                switch (type_selected.Slug) {
                    case 'com_comite_inter_m':
                        $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                        break;

                    case 'com_mtfpas':
                        $scope.dataObject.libelle = type_selected.LibelleTypeSujet;
                        break;

                    case 'adopt_compt_rendu':
                        $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                        break;

                    case 'point_taches_codir':
                        $scope.dataObject.libelle = type_selected.LibelleTypeSujet +' du ';
                        break;
                
                    default:
                        $scope.dataObject.libelle = '';
                        break;
                }
            }
        }

        $scope.saveSujetComDirAndInsc = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            $scope.params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:2,// Inscrire le sujet au codir après l'avoir crée
                md: 'add',
                IdCodir:$scope.thiscodir.IdCodir,
                LibelleSujet:$scope.dataObject.libelle,
                IdTypeSujet:$scope.dataObject.typesujet.IdTypeSujet,
                EtatSujet:2,
                Observations:$scope.dataObject.observations
            }
                Model.saveSujetCodir($scope.params)
                    .then(function () {
                        getListSujetInsComDirection();
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        $scope.ctrlmessage = "Sujet inscrit au codir !";
                        $('#AddEditSujetModal').modal('hide');
                    }, function (error) {
                        $scope.dataObject.submit = false;
                        $scope.errorform = true;
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        }
                    });
        }

        $scope.saveDesinscripSujDirecCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                IdCodir:$scope.thiscodir.IdCodir,
                IdSujet:$scope.dataObject.id_suj,
                Action:2
            }
            Model.saveInscripSujetCodir(params)
                .then(function () {
                    getListSujetInsComDirection();
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Sujet désinscrit du codir !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }

        $scope.formDesinscripSujDirectCodir = function(suj) {
            $scope.ctrlmessage = '';
            $scope.errorform = false;
            $scope.successform = false;
    
            $scope.dataObject = {};
            $scope.dataObject.submit = false;
            $scope.dataObject.form_title = "Désinscrire le sujet du codir";
            $scope.dataObject.id_suj = suj.IdSujet;
            $scope.dataObject.titresuj = suj.LibelleSujet;
            $('#DesinscripSujDirecCodir').modal('show');
        }

})

ctrl.controller("OrdreJourCodirCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
        
        // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
        $http.get(server_urlcheckauth).success(function() {
            $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
            if($rootScope.UserConnected === null)
                $state.go('login');
            }).error(function(error) {
                $state.go('login');
        });

        $scope.thiscodir = $stateParams.codir;
        if($scope.thiscodir == null) $state.go('app.codir.codir.liste');

        $rootScope.titrepage = "Ordre du jour du " + $scope.thiscodir.LibelleCodir;

        $scope.table = {};
        $scope.tablecominterminit = {};
        $scope.tablecominitminit = {};
        $scope.tablesujetstype = {};

        $scope.table.isSearching = true;
        $scope.tablecominterminit.isSearching = true;
        $scope.tablecominitminit.isSearching = true;
        $scope.tablesujetstype.isSearching = false;

        $scope.sujetstype = {};

        $scope.errorform = false;
        $scope.dataObject = {};
        $scope.trust = $sce.trustAsHtml;

        $scope.sortableOptions = {
            'disabled':!$rootScope.showmenu.MenuModifyOrdreJourCodir,
            connectWith: ".list_reorder",
            axis: 'y',
            'ui-floating': false,
            start: function(e, ui) {
            },
            update: function(e, ui) {
            },
            stop: function(e, ui) {
              
            }
        };

        $scope.statusComInterMinist = {
            open:false
        }

        $scope.statusComInitMinist = {
            open:false
        }

        var getListComOneCodir = function () {
            $scope.tablecominterminit.isSearching = true;
            Model.getListComOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablecominterminit.isSearching = false;
                    $scope.cominterminist = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        $scope.getListComOneCodirFn = function (){
            getListComOneCodir();
        }

        var getListComInitMinOneCodir = function () {
            $scope.tablecominitminit.isSearching = true;
            Model.getListComInitMinOneCodir($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.tablecominitminit.isSearching = false;
                    $scope.cominitminist = Model.communications;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        $scope.getListComInitMinOneCodirFn = function (){
            getListComInitMinOneCodir();
        }

        var getListSujetTypeInscritOneCodir = function (id_type_sujet) {
            $scope.tablesujetstype.isSearching = true;
            Model.getListSujetTypeInscritOneCodir($scope.thiscodir.IdCodir,id_type_sujet)
                .then(function () {
                    $scope.tablesujetstype.isSearching = false;
                    $scope.sujetstype = Model.sujets;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }
        $scope.getListSujetTypeInscritOneCodirFn = function (id_type_sujet){
            getListSujetTypeInscritOneCodir(id_type_sujet);
        }

        $scope.preference_ordre_jour = {};
        var getListPreferenceOrdreJourCodir = function () {
              Model.getListPreferenceOrdreJourCodir()
                .then(function () {
                    $scope.preference_ordre_jour = Model.preference;
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
        }
        getListPreferenceOrdreJourCodir();

        var getListOrdreJourOneCodir = function () {
            Model.getListOrdreJourOneCodir($scope.thiscodir.IdCodir)
              .then(function () {
                  $scope.codir_ordre_jour = Model.ordrejour;
                  getListSujetOneCodirOrdreJour();
              }, function (error) {
                  if(error.data.error == 'token_not_provided') {
                      $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                      $state.go('login');
                  }
              });
      }
      getListOrdreJourOneCodir();
      getListComOneCodir();
      getListComInitMinOneCodir();

        var getListSujetOneCodirOrdreJour = function () {
            Model.getListSujetOneCodirOrdreJour($scope.thiscodir.IdCodir)
                .then(function () {
                    $scope.sujets = Model.sujets;
                    $scope.dataObject = {};
                    $scope.dataObject.listeordre = [];
                    if(angular.equals($scope.codir_ordre_jour, [])){
                        $scope.dataObject.id = 0;
                        var array_ordre_sujet = $scope.preference_ordre_jour.Valeur.split('-');
                        angular.forEach(array_ordre_sujet, function(value,j) {
                            if(value !='') {
                                var in_list = $filter('filter')($scope.sujets,{'IdTypeSujet':Utilitaire.convertToInt(value)},true)[0];
                                if(in_list != undefined && in_list!=null) {
                                    $scope.dataObject.listeordre.push(in_list);
                                }
                            }
                        });
                    }else {
                        $scope.dataObject.id = $scope.codir_ordre_jour.id;
                        var add_id_type = '';
                        var array_preference_o_sujet = $scope.preference_ordre_jour.Valeur.split('-');
                        angular.forEach(array_preference_o_sujet, function(value,i){
                            if(value !=''){
                                if($scope.codir_ordre_jour.OrdreTypeSujet.indexOf('-'+value+'-') ===-1){
                                    add_id_type = add_id_type + value+ '-';
                                }
                            }
                        });
                        var array_ordre_sujet_temp = $scope.codir_ordre_jour.OrdreTypeSujet + add_id_type;
                        var array_ordre_sujet = array_ordre_sujet_temp.split('-');
                        angular.forEach(array_ordre_sujet, function(value,j) {
                            if(value !='') {
                                var in_list = $filter('filter')($scope.sujets,{'IdTypeSujet':Utilitaire.convertToInt(value)},true)[0];
                                if(in_list != undefined && in_list!=null) {
                                    $scope.dataObject.listeordre.push(in_list);
                                }
                            }
                        });

                    }
                    $scope.table.isSearching = false;
                    
                }, function (error) {
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }

              });
        }

        // PREREMPLIR LES PROFILS
        $scope.actions = [
            {'id_etat':1,'lib_etat':'Inscrire'},
            {'id_etat':2,'lib_etat':'Désinscrire'}
        ];

        $scope.refreshState = function (){
            $state.reload();
        }

        $scope.resetError = function () {
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";
        }

        $scope.saveOrdreJourOneCodir = function (){
            $scope.dataObject.submit = true;
            $scope.errorform = false;
            $scope.successform = false;
            $scope.ctrlmessage = "";

            var ids_type_sujet = [];
            angular.forEach($scope.dataObject.listeordre, function(value,i) {   
             ids_type_sujet.push(value.IdTypeSujet);
            });

            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:2,
                id:$scope.dataObject.id,
                IdCodir:$scope.thiscodir.IdCodir,
                OrdreTypeSujet:ids_type_sujet
            }

            Model.saveOrdreJourOneCodir(params)
                .then(function () {
                    if($scope.dataObject.id == 0 ){
                        $scope.dataObject.id = Model.ordrejour.id;
                    }
                    $scope.dataObject.submit = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = "Ordre du jour modifié !";
                }, function (error) {
                    $scope.dataObject.submit = false;
                    $scope.errorform = true;
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    }
                });
    }
    
})

ctrl.controller("ViewCommentComCodirCtrl", function($sce,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    $rootScope.titrepage = "Visualisation des observations sur la communication";

    $scope.table = {};
    $scope.table.isSearching = true;

    $scope.thiscodir = $stateParams.codir;
    $scope.thiscom = $stateParams.com;

    $scope.getreadMoreState = false;

    $scope.dataObject = {};
    $scope.dataObject.communication = {};

    $scope.readMoreObservation = function (index){
        if($scope.observations[index].getreadMoreState) {
            $scope.observations[index].getreadMoreState = false;
        }
        else $scope.observations[index].getreadMoreState = true;
    }

    var getListComOneCodirStructure = function () {
        Model.getListComOneCodirStructure($scope.thiscodir.IdCodir,$rootScope.UserConnected.IdStructure)
            .then(function () {
                $scope.communications = Model.communications;
                $scope.dataObject.communication = $filter('filter')($scope.communications,{'IdCom':$scope.thiscom.IdCommunication},true)[0];
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
          });
    }
    getListComOneCodirStructure();

    var getListCommentComOneCodir = function (id_com) {
        
        Model.getListCommentComOneCodir($scope.thiscodir.IdCodir,id_com)
            .then(function () {
                $scope.table.isSearching = false;
                $scope.observations = Model.observations;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }

          });
    }
    getListCommentComOneCodir($scope.thiscom.IdCommunication);

    $scope.refreshState = function (){
        $state.reload();
    }

    $scope.getListCommentComOneCodirView = function (item){
        getListCommentComOneCodir(item.IdCom);
    }

})

ctrl.controller("ViewCommentSujetCodirCtrl", function($sce,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    $rootScope.titrepage = "Visualisation des observations sur le sujet";

    $scope.table = {};
    $scope.table.isSearching = true;

    $scope.thiscodir = $stateParams.codir;
    $scope.thissujet = $stateParams.sujet;

    $scope.getreadMoreState = false;

    $scope.dataObject = {};
    $scope.dataObject.sujet = {};

    $scope.readMoreObservation = function (index){
        if($scope.observations[index].getreadMoreState) {
            $scope.observations[index].getreadMoreState = false;
        }
        else $scope.observations[index].getreadMoreState = true;
    }

    var getListSujetOneCodirStructure = function () {
        Model.getListSujetOneCodirStructure($scope.thiscodir.IdCodir,$rootScope.UserConnected.IdStructure)
            .then(function () {
                $scope.sujets = Model.sujets;
                $scope.dataObject.sujet = $filter('filter')($scope.sujets,{'IdSujet':$scope.thissujet.IdSujet},true)[0];
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
          });
    }
    getListSujetOneCodirStructure();

    var getListCommentSujetOneCodir = function (id_sujet) {
        Model.getListCommentSujetOneCodir($scope.thiscodir.IdCodir,id_sujet)
            .then(function () {
                $scope.table.isSearching = false;
                $scope.observations = Model.observations;
            }, function (error) {
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }

          });
    }
    getListCommentSujetOneCodir($scope.thissujet.IdSujet);

    $scope.refreshState = function (){
        $state.reload();
    }

    $scope.getListCommentSujetOneCodirView = function (item){
        getListCommentSujetOneCodir(item.IdSujet);
    }

})

ctrl.controller("ListeComInitMinistereCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    $rootScope.titrepage = "Liste des commnications initiées par le ministère";

    $scope.table = {};
    $scope.table.isSearching = true;

    $scope.refreshState = function (){
        $state.reload();
    }
    
    var getListComInitMinCodir = function () {
        $scope.table.isSearching = true;
        Model.getListComInitMinCodir()
        .then(function () {
            $scope.communications = Model.communications;
            $scope.table.isSearching = false;
        }, function (error) {
            if(error.data.error == 'token_not_provided') {
                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                $state.go('login');
            }
        });
    }
    getListComInitMinCodir();

    $scope.trust = $sce.trustAsHtml;

    $scope.actions = [
        {'id_etat':1,'lib_etat':'Proposer'},
        {'id_etat':2,'lib_etat':'Annuler la proposition'}
    ];
    var getListCodirOuvert = function () {
        Model.getListCodirOuvert()
        .then(function () {
            $scope.codirouvert = Model.codirouvert;
        }, function (error) {
            if(error.data.error == 'token_not_provided') {
                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                $state.go('login');
            }
        });
    }
    getListCodirOuvert();

    $scope.formPropComCodir = function (obj){
        if(angular.equals($scope.codirouvert,[])){
            $scope.errorform = true;
            $scope.ctrlmessage =  " Aucun codir n'est ouvert ";
            return;
        }
        $scope.ctrlmessage = '';
        $scope.errorform = false;
        $scope.successform = false;
        $scope.dataObject = {};

        $scope.dataObject.form_title = "Proposer la com au prochain codir";
        $scope.dataObject.id = obj.IdCommunication;
        $scope.dataObject.id_structure = obj.IdStructure;
        $scope.dataObject.objet_com = obj.Objet;
        $scope.dataObject.lib_nextcodir = $scope.codirouvert[0].LibelleCodir;
        $scope.dataObject.action = $scope.actions[0];
        $('#ProposerComCodirModal').modal('show');
    }

    $scope.savePropComCodir = function () {
        $scope.dataObject.submit = true;
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";

        var params = {
            current_module_id : $rootScope.UserConnected.current_module_id,
            md: $scope.modalstate,
            IdCommunication:$scope.dataObject.id,
            IdStructure:$scope.dataObject.id_structure,
            IdCodir:$scope.codirouvert[0].IdCodir,
            Action:$scope.dataObject.action.id_etat
        }

        Model.savePropComCodir(params)
            .then(function () {
                $scope.dataObject.submit = false;
                $scope.successform = true;
                $scope.ctrlmessage = "Enregistrement effectué !";
            }, function (error) {
                $scope.dataObject.submit = false;
                $scope.errorform = true;
                $scope.ctrlmessage = error.data.message;
                if(error.data.error == 'token_not_provided') {
                    $('#ProposerComCodirModal').modal('hide');
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
    }

         // SUPPRIMER
         $scope.dropComCodir = function(o) {
            
            var msgConfirm = "Voulez-vous supprimer la communication ?";
            var confirmResult = confirm(msgConfirm);
            if (confirmResult === false) return;
    
            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
                after_done:1
            };
    
            Model.dropComInitMinCodir(o.IdCommunication,params)
                .then(
                    function () {
                    $scope.communications = Model.communications;
                    },
                    function (error) { 
                        $scope.ctrlmessage = error.data.message;
                        if(error.data.error == 'token_not_provided') {
                            $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                            $state.go('login');
                        } 
                    });
        }


})

ctrl.controller("ComInitMinistereCtrl", function($sce,$window,$filter,$http,$scope,FileUploader,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
    $http.get(server_urlcheckauth).success(function() {
        $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
        if($rootScope.UserConnected === null)
            $state.go('login');
        }).error(function(error) {
            $state.go('login');
    });

    //console.info($stateParams.com);

    $rootScope.titrepage = "Editer une communication initiée par le ministère";

    $scope.etats = [
        {'id_etat':3,'lib_etat':'En cours de traitement'},
        {'id_etat':4,'lib_etat':'Traité'}
    ];

    var getListFilesOneComMinist = function (id_com) {
        Model.getListFilesOneComMinist(id_com)
        .then(function () {
            $scope.filescom = Model.files;
        }, function (error) {
            if(error.data.error == 'token_not_provided') {
                $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                $state.go('login');
            }
        });
    }

    $scope.dataObject = {};
    if($stateParams.com != null) {
        if($stateParams.com != 'empty') {
            $scope.dataObject.readonly =  $stateParams.readonly;
            $scope.dataObject.md = 'edit';
            $scope.dataObject.id = $stateParams.com.IdCommunication;
            $scope.dataObject.objet = $stateParams.com.Objet;
            $scope.dataObject.recommandation = $stateParams.com.Recommandation;
            $scope.dataObject.justification = $stateParams.com.Justification;
            $scope.dataObject.coutsourcefinance = $stateParams.com.CoutSourceFinance;
            $scope.dataObject.consultation = $stateParams.com.Consultation;
            getListFilesOneComMinist($scope.dataObject.id);
        }else {
            $scope.dataObject.readonly =  false;
            $scope.dataObject.md = 'add';
            $scope.dataObject.id = 0;
            $scope.dataObject.objet = ''; 
            $scope.dataObject.recommandation = '';
            $scope.dataObject.justification = '';
            $scope.dataObject.coutsourcefinance = '';
            $scope.dataObject.consultation = '';
            $scope.dataObject.etat = '';
        }
    }else {
        $state.go('app.codir.communication.ministere.liste');
    }

    $scope.ObjetTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: true,
        readonly:$scope.dataObject.readonly,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks',
            'insertdatetime media table contextmenu paste'
          ],
        toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };
    $scope.statusObjet = {
        open:false
    }
    $scope.RecomTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: true,
        readonly:$scope.dataObject.readonly,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media table contextmenu code'
          ],
          toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };
    $scope.statusRecom = {
        open:false
    }
    $scope.JustifTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: true,
        readonly:$scope.dataObject.readonly,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media table contextmenu code'
          ],
          toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };
    $scope.statusJustif = {
        open:false
    }
    $scope.CoutTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: true,
        readonly:$scope.dataObject.readonly,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media table contextmenu code'
          ],
          toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };
    $scope.statusCout = {
        open:false
    }
    $scope.ConsultTinymceOptions =  {
        onChange: function(e) {

        },
        height: 200,
        menubar: true,
        readonly:$scope.dataObject.readonly,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media table contextmenu code'
          ],
          toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        skin: 'lightgray',
        themes : 'modern',
        language: 'fr_FR'
    };
    $scope.statusConsult = {
        open:false
    }

    // Gestion de l'envoi des fichiers sur le serveur
    var uploader = $scope.uploader = new FileUploader({
        url: server_url + 'codir/communication/initministere/addfile',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
    });

    // Add metadata to form for retrieve there on server
    uploader.onBeforeUploadItem = function(item) {
        var paramsFile = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            IdCommunication:$scope.dataObject.id,
        }
        item.formData.push(paramsFile);
    };

    // Filtre
    var supportedFileFormat = [
        'application/pdf'
    ];
    uploader.filters.push({
        name: 'filtrefile',
        fn: function(item,options) {
                if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                    {
                        if(item.size <= 5242880)  return true; // <--5 Mo //  1048576(o) = 1Mo = 1024 * 1024 (1o)
                    }      
                return false;
        }
    });

    uploader.filters.push({
        name: 'FichiersMax',
        fn: function(item , options) {
            return this.queue.length < 7;
        }
    });

    uploader.onAfterAddingFile = function(fileItem) {
        $scope.errorform = false;
        $scope.ctrlmessage = "";
    };

    uploader.onWhenAddingFileFailed = function(item, filter, options) {
        $scope.showUploadButton = false;
        $scope.errorform = true;
        $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
    }
    uploader.onSuccessItem = function(item, response,status,headers) {
        if(status != 200) {
            $scope.dataObject.submit = false;
            $scope.errorform = true;
            $scope.ctrlmessage = response.message;
            if(response.data.error == 'token_not_provided') {
                $rootScope.loginFormScope={};$rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                $state.go('login');
            }
        }  
    }

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };

    uploader.onCompleteAll = function() {
        getListFilesOneComMinist($scope.dataObject.id);
        $scope.dataObject.submit = false;
        $scope.successform = true;
        var pl_s = '';
        if(uploader.queue.length > 1 ) pl_s = 's';
        else pl_s = '';
        $scope.ctrlmessage = 'La communication a été enregistrée avec ' + uploader.queue.length + ' fichier'+pl_s+ ' ajouté'+pl_s;
        $scope.addFile = false;
        $scope.viewFile = true;
        uploader.clearQueue();
    };
    
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.ctrlmessage = response.message;
        $scope.dataObject.submit = false;
        $scope.errorform = true;
    }

    $scope.saveComInitMinCodir = function (){
        $scope.dataObject.submit = true;
        $scope.params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            after_done:2,
            md:$scope.dataObject.md,
            IdCommunication:$scope.dataObject.id,
            EtatCom:1,
            IdStructure:$rootScope.UserConnected.IdStructure,
            Objet:$scope.dataObject.objet,
            Recommandation:$scope.dataObject.recommandation,
            Justification:$scope.dataObject.justification,
            CoutSourceFinance:$scope.dataObject.coutsourcefinance,
            Consultation:$scope.dataObject.consultation
        }
            Model.saveComInitMinCodir($scope.params)
            .then(function () {
                if($scope.dataObject.md == 'add'){
                    $scope.dataObject.id = Model.communications.id;
                    if(uploader.queue.length > 0) {
                        uploader.uploadAll();
                    }else{
                        $scope.dataObject.md = 'edit';
                        $scope.ctrlmessage = Model.communications.message;
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        uploader.clearQueue();
                        document.getElementById('fileupload').value = null;
                    }
                    
                }else {
                    if(uploader.queue.length > 0) {
                        uploader.uploadAll();
                    }else {
                        $scope.ctrlmessage = 'Communication enregistrée';
                        $scope.dataObject.submit = false;
                        $scope.successform = true;
                        uploader.clearQueue();
                        document.getElementById('fileupload').value = null;
                    }
                }
                
            }, function (error) {
                $scope.dataObject.submit = false;
                $scope.errorform = true;
                $scope.ctrlmessage = error.data.message;
                if(error.data.error == 'token_not_provided') {
                    $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                    $state.go('login');
                }
            });
    }

    $scope.deleteFileComInitMinCodir = function (file){
        var msgConfirm = "Voulez-vous supprimer le fichier ?";
        var confirmResult = confirm(msgConfirm);
        if (confirmResult === false) return;

        var params = {
            current_module_id : $rootScope.UserConnected.current_module_id,
            IdCommunication:$scope.dataObject.id,
            after_done:1
        };

        Model.deleteFileComInitMinCodir(file.id,params)
            .then(
                function () {
                    $scope.filescom = Model.files;
                },
                function (error) { 
                    $scope.ctrlmessage = error.data.message;
                    if(error.data.error == 'token_not_provided') {
                        $rootScope.loginFormScope={};$rootScope.loginFormScope.error = 'Votre session a expiré. Reconnectez-vous svp !';
                        $state.go('login');
                    } 
                }
            );
    }

    $scope.resetError = function () {
        $scope.errorform = false;
        $scope.successform = false;
        $scope.ctrlmessage = "";
    }

})

ctrl.controller("ImportListeBrutesCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Importation des listes brutes";

      $scope.showUploadButton = false;

      $scope.trust = $sce.trustAsHtml;
      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listebrute',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
             item.formData = [{
                  current_module_id: $rootScope.UserConnected.current_module_id
            }];
            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = [
            'text/csv',
            'text/plain',
            'application/csv',
            'application/vnd.ms-exced',// xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',// xlsx
                    ];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        };

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            }
            
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})

ctrl.controller("ImportListeValideesCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Importation des listes validées";

      $scope.showUploadButton = false;

      $scope.trust = $sce.trustAsHtml;
      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listevalidee',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
             item.formData = [{
                  current_module_id: $rootScope.UserConnected.current_module_id
            }];

            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = [
            'text/csv',
            'text/plain',
            'application/csv',
            'application/vnd.ms-exced',// xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',// xlsx
                    ];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        };

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            }     
    }

    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})

ctrl.controller("ImportListeTmicAdditCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Importation des TMIC additionnels";

      $scope.showUploadButton = false;

      $scope.trust = $sce.trustAsHtml;

      $scope.dataForm = {'typetransfert':''}
      $scope.typetransferts = [{'slug':'tmic','lib_transfert':'TMIC'},{'slug':'cash','lib_transfert':'CASH'}]
      $scope.dataForm.typetransfert = $scope.typetransferts[0];
      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listestructuresaddit',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
             item.formData = [{
                current_module_id: $rootScope.UserConnected.current_module_id,
                typetransfert:$scope.dataForm.typetransfert.slug
            }];

            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = [
            'application/zip',
            'application/vnd.ms-exced',// xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',// xlsx
        ];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        };

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            } 
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})

ctrl.controller("ImportListePaieInconditCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste des paiements inconditionnels";

      $scope.trust = $sce.trustAsHtml;

      $scope.showUploadButton = false;

      $scope.dataForm = {'typetransfert':'','choiceannee':'','mois':''}

      $scope.typetransferts = [{'slug':'tmic','lib_transfert':'TMIC'},{'slug':'cash','lib_transfert':'CASH'}]
      $scope.dataForm.typetransfert = $scope.typetransferts[1];

      $scope.currentyear = new Date().getFullYear();
      $scope.annees = [];
      if($scope.currentyear > 2015) {
          diff = $scope.currentyear - 2015;
          for(i=0;i<=diff;i++) {
              $scope.annees.push({'annee':2015+i});
          }
      }
      
      $scope.allmonths = [{'mois':1,'lib_mois':'JANVIER'},{'mois':2,'lib_mois':'FEVRIER'},
      {'mois':3,'lib_mois':'MARS'},{'mois':4,'lib_mois':'AVRIL'},{'mois':5,'lib_mois':'MAI'},
      {'mois':6,'lib_mois':'JUIN'},{'mois':7,'lib_mois':'JUILLET'},{'mois':8,'lib_mois':'AOUT'},
      {'mois':9,'lib_mois':'SEPTEMBRE'},{'mois':10,'lib_mois':'OCTOBRE'},{'mois':11,'lib_mois':'NOVEMBRE'},
      {'mois':12,'lib_mois':'DECEMBRE'}];

      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listepaieincondit',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token }
            
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [{
                    current_module_id: $rootScope.UserConnected.current_module_id,
                    typetransfert:$scope.dataForm.typetransfert.slug,
                    annee:$scope.dataForm.choiceannee.annee,
                    mois:$scope.dataForm.mois.mois
            }];
            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = ['application/zip'];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        }

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            } 
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})

ctrl.controller("ImportListePaieConditCtrl", function(FileUploader,$window,$sce,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste des paiements conditionnels";

      $scope.trust = $sce.trustAsHtml;

      $scope.showUploadButton = false;

      $scope.dataForm = {'typetransfert':'','choiceannee':'','mois':''}

      $scope.typetransferts = [{'slug':'tmic','lib_transfert':'TMIC'},{'slug':'cash','lib_transfert':'CASH'}]
      $scope.dataForm.typetransfert = $scope.typetransferts[0];

      $scope.currentyear = new Date().getFullYear();
      $scope.annees = [];
      if($scope.currentyear > 2015) {
          diff = $scope.currentyear - 2015;
          for(i=0;i<=diff;i++) {
              $scope.annees.push({'annee':2015+i});
          }
      }
      
      $scope.allmonths = [{'mois':1,'lib_mois':'JANVIER'},{'mois':2,'lib_mois':'FEVRIER'},
      {'mois':3,'lib_mois':'MARS'},{'mois':4,'lib_mois':'AVRIL'},{'mois':5,'lib_mois':'MAI'},
      {'mois':6,'lib_mois':'JUIN'},{'mois':7,'lib_mois':'JUILLET'},{'mois':8,'lib_mois':'AOUT'},
      {'mois':9,'lib_mois':'SEPTEMBRE'},{'mois':10,'lib_mois':'OCTOBRE'},{'mois':11,'lib_mois':'NOVEMBRE'},
      {'mois':12,'lib_mois':'DECEMBRE'}];

      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listepaiecondit',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token }
            
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [{
                    current_module_id: $rootScope.UserConnected.current_module_id,
                    typetransfert:$scope.dataForm.typetransfert.slug,
                    annee:$scope.dataForm.choiceannee.annee,
                    mois:$scope.dataForm.mois.mois
            }];
            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = ['application/zip'];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        }

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
                console.log(response);
            } 
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
        console.log(response);
    }
})

ctrl.controller("ImportListePaieInconditRetardCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Importation des paiements inconditionnels payés en retard";

      $scope.trust = $sce.trustAsHtml;

      $scope.showUploadButton = false;

      $scope.dataForm = {'typetransfert':'','choiceannee':'','mois':''}

      $scope.typetransferts = [{'slug':'tmic','lib_transfert':'TMIC'},{'slug':'cash','lib_transfert':'CASH'}]
      $scope.dataForm.typetransfert = $scope.typetransferts[1];

      $scope.currentyear = new Date().getFullYear();
      $scope.annees = [];
      if($scope.currentyear > 2015) {
          diff = $scope.currentyear - 2015;
          for(i=0;i<=diff;i++) {
              $scope.annees.push({'annee':2015+i});
          }
      }
      
      $scope.allmonths = [{'mois':1,'lib_mois':'JANVIER'},{'mois':2,'lib_mois':'FEVRIER'},
      {'mois':3,'lib_mois':'MARS'},{'mois':4,'lib_mois':'AVRIL'},{'mois':5,'lib_mois':'MAI'},
      {'mois':6,'lib_mois':'JUIN'},{'mois':7,'lib_mois':'JUILLET'},{'mois':8,'lib_mois':'AOUT'},
      {'mois':9,'lib_mois':'SEPTEMBRE'},{'mois':10,'lib_mois':'OCTOBRE'},{'mois':11,'lib_mois':'NOVEMBRE'},
      {'mois':12,'lib_mois':'DECEMBRE'}];

      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-listepaieinconditretard',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token }
            
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [{
                    current_module_id: $rootScope.UserConnected.current_module_id,
                    typetransfert:$scope.dataForm.typetransfert.slug,
                    annee:$scope.dataForm.choiceannee.annee,
                    mois:$scope.dataForm.mois.mois
            }];
            $scope.showUploadButton = false;
        };

        // Filtre
        var supportedFileFormat = ['application/zip'];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        }

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            } 
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})

ctrl.controller("ImportDocProjetCtrl", function($sce,FileUploader,$window,$filter,$http,$scope,$rootScope, $log, Model,DTOptionsBuilder, DTColumnBuilder, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Charger les documents du projet";

      $scope.trust = $sce.trustAsHtml;

      $scope.showUploadButton = false;

      $scope.dataForm = {'titre':''}
      
      // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'uploadfile-documentsprojets',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token }
            
        });

        // Add metadata to form for retrieve there on server
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [{
                    current_module_id: $rootScope.UserConnected.current_module_id,
                    titredoc:$scope.dataForm.titre
            }];
            $scope.showUploadButton = false;
        };

        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                if(item.size <= 2000000000)  return true; // <--1O Mo //  10485760(o) = 1Mo = 1024 * 1024 (1o)
                return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.showUploadButton = true;
            $scope.errorform = false;
            $scope.ctrlmessage = "";
        }

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            $scope.showUploadButton = false;
            $scope.errorform = true;
            $scope.ctrlmessage = "Format incorrect ou taille limite dépassée du fichier choisi";
        }
        uploader.onSuccessItem = function(item, response,status,headers) {
            $scope.showUploadButton = true;
            if(status == 200) {
                $scope.successform = true;
                $scope.ctrlmessage = response.message;
            }
            else {
                $scope.errorform = true;
                $scope.ctrlmessage = response.message;
            } 
    }
    uploader.onErrorItem = function (item, response,status,headers) {
        $scope.errorform = true;
        $scope.ctrlmessage = response.message;
    }
})


/**
 * Traiement
 */



 /**
  * Consultation
  */
ctrl.controller("ConsultListeBrutesCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste brute";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.viewDetail = viewDetail;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
       var titleHtml = '<input type="checkbox" ng-model="listbrute.selectAll" ng-click="listbrute.toggleAll(listbrute.selectAll, listbrute.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_menage] = false;
                return '<input type="checkbox" ng-model="listbrute.selected[' + data.id_menage + ']" ng-click="listbrute.toggleOne(listbrute.selected)">';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Détail').notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                return '<button ng-click="listbrute.viewDetail('+'\''+ data.code_menage+'\''+')" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></button>';
            }),
            DTColumnBuilder.newColumn('village.arrondissement.commune.departement.lib_departement','Département').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.commune.lib_commune','Commune').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.lib_arrondis','Arrondissement').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_menage','Code ménage')
                .withOption('name','code_menage'),
            DTColumnBuilder.newColumn('nom_cdm','Nom CDM')
                .withOption('name','nom_cdm'),
            DTColumnBuilder.newColumn('prenom_cdm','Prénom(s) CDM')
                .withOption('name','prenom_cdm'),
            DTColumnBuilder.newColumn('surnom_cdm','Surnom CDM')
                .withOption('name','surnom_cdm'),
            DTColumnBuilder.newColumn('sexe_cdm','Sexe CDM')
                .withOption('name','sexe_cdm'),
            DTColumnBuilder.newColumn('age_cdm','Age CDM')
                .withOption('name','age_cdm'),
            DTColumnBuilder.newColumn('date_soumission','Date enrollement').notSortable()
                .withOption('searchable',false)
                .renderWith(function(data, type, full, meta){
                    return moment(data).format('DD-MM-YYYY HH:mm')
                })
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlistebrute', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function viewDetail(code_menage) {
            $state.go('app.consultation.viewdetailmenage',{obj: {code_menage: code_menage}});
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_menages:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_menages = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_menages.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_menages.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_menages = array_id_menages;
            }else if(type==='all') {

            }

            Model.exportListeBrute(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-brute.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-brute.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }
})

ctrl.controller("ConsultListeClassifCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste classifiées";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.viewDetail = viewDetail;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
    
       var titleHtml = '<input type="checkbox" ng-model="listclassif.selectAll" ng-click="listclassif.toggleAll(listclassif.selectAll, listclassif.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_menage] = false;
                return '<input type="checkbox" ng-model="listclassif.selected[' + data.id_menage + ']" ng-click="listclassif.toggleOne(listclassif.selected)">';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Détail').notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                return '<button ng-click="listclassif.viewDetail('+'\''+ data.code_menage+'\''+')" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></button>';
            }),
            DTColumnBuilder.newColumn('village.arrondissement.commune.departement.lib_departement','Département').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.commune.lib_commune','Commune').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.lib_arrondis','Arrondissement').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_menage','Code ménage')
                .withOption('name','code_menage'),
            DTColumnBuilder.newColumn('nom_cdm','Nom CDM')
                .withOption('name','nom_cdm'),
            DTColumnBuilder.newColumn('prenom_cdm','Prénom(s) CDM')
                .withOption('name','prenom_cdm'),
            DTColumnBuilder.newColumn('surnom_cdm','Surnom CDM')
                .withOption('name','surnom_cdm'),
            DTColumnBuilder.newColumn('sexe_cdm','Sexe CDM')
                .withOption('name','sexe_cdm'),
            DTColumnBuilder.newColumn('age_cdm','Age CDM')
                .withOption('name','age_cdm'),
            DTColumnBuilder.newColumn('score_classification','Score classification')
                .withOption('name','score_classification'),
            DTColumnBuilder.newColumn('libelle_statut_classif','Statut classification')
                .withOption('name','libelle_statut_classif')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('date_soumission','Date enrollement').notSortable()
                .withOption('searchable',false)
                .renderWith(function(data, type, full, meta){
                    return moment(data).format('DD-MM-YYYY HH:mm')
                })
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlisteclassifiee', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function viewDetail(code_menage) {
            $state.go('app.consultation.viewdetailmenage',{obj: {code_menage: code_menage}});
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_menages:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_menages = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_menages.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_menages.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_menages = array_id_menages;
            }else if(type==='all') {

            }

            Model.exportListeClassif(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-classifiees.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-classifiees.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }

})
ctrl.controller("ConsultListeValideesCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste validées";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.viewDetail = viewDetail;
        vm.editMenage = editMenage;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
    
       var titleHtml = '<input type="checkbox" ng-model="listvalid.selectAll" ng-click="listvalid.toggleAll(listvalid.selectAll, listvalid.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_menage] = false;
                return '<input type="checkbox" ng-model="listvalid.selected[' + data.id_menage + ']" ng-click="listvalid.toggleOne(listvalid.selected)">';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                return '<button ng-click="listvalid.viewDetail('+'\''+ data.code_menage+'\''+')" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></button><button ng-click="listvalid.editMenage('+'\''+ data.code_menage+'\''+')" class="btn btn-xs btn-primary" style="margin-left:10px"><i class="fa fa-edit"></i></button>';
            }),
            DTColumnBuilder.newColumn('village.arrondissement.commune.departement.lib_departement','Département').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.commune.lib_commune','Commune').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.arrondissement.lib_arrondis','Arrondissement').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_menage','Code ménage')
                .withOption('name','code_menage'),
            DTColumnBuilder.newColumn('nom_cdm','Nom CDM')
                .withOption('name','nom_cdm'),
            DTColumnBuilder.newColumn('prenom_cdm','Prénom(s) CDM')
                .withOption('name','prenom_cdm'),
            DTColumnBuilder.newColumn('surnom_cdm','Surnom CDM')
                .withOption('name','surnom_cdm'),
            DTColumnBuilder.newColumn('sexe_cdm','Sexe CDM')
                .withOption('name','sexe_cdm'),
            DTColumnBuilder.newColumn('age_cdm','Age CDM')
                .withOption('name','age_cdm'),
            DTColumnBuilder.newColumn('score_classification','Score classification')
                .withOption('name','score_classification'),
            DTColumnBuilder.newColumn('libelle_statut_classif','Statut classification')
                .withOption('name','libelle_statut_classif')
                .withOption('searchable',false),
            
            DTColumnBuilder.newColumn('libelle_statut_valid','Statut validation')
                .withOption('name','libelle_statut_valid')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('date_soumission','Date enrollement').notSortable()
                .withOption('searchable',false)
                .renderWith(function(data, type, full, meta){
                    return moment(data).format('DD-MM-YYYY HH:mm')
                })
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlistevalidee', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function viewDetail(code_menage) {
            $state.go('app.consultation.viewdetailmenage',{obj: {code_menage: code_menage}});
        }
        function editMenage(code_menage) {
            $state.go('app.consultation.editmenage',{obj: {code_menage: code_menage}});
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_menages:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_menages = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_menages.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_menages.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_menages = array_id_menages;
            }else if(type==='all') {

            }

            Model.exportListeValid(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-validee.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-validee.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }

})

 ctrl.controller("ConsultDetailsMenageCtrl", function($window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Détails du menage";

      var vm = this;
      vm.getDetailsMenage = getDetailsMenage;
      vm.getThismenage = getThismenage;
      
      vm.isSearching = true;
      vm.errorSearch = false;
      vm.this_code_menage = $stateParams.obj.code_menage;

      function getDetailsMenage(code_menage) {
          vm.isSearching = true;
          vm.errorSearch = false;
            var params =  {
                current_module_id : $rootScope.UserConnected.current_module_id,
                code_menage : code_menage
            }
            Model.getDetailsMenage(params)
                .then(function () {
                    vm.detailsmenage = Model.detailsmenage;
                    vm.isSearching = false;
                }, function (error) {
                    vm.detailsmenage = error.data.message;
                    vm.errorSearch = true;
                    vm.isSearching = false;
            });
      }
      getDetailsMenage(vm.this_code_menage);

      function getThismenage() {
          getDetailsMenage(vm.this_code_menage);
      }
 })

ctrl.controller("EditMenageInfosCtrl", function($window,moment,FileUploader,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Edition du chef ménage";

      var vm = this;
      vm.getInfosMenage = getInfosMenage;
      vm.getThismenage = getThismenage;
      vm.saveMenage = saveMenage;
      
      vm.isSearching = true;
      vm.errorSearch = false;
      vm.ctrlmessage = "";
      vm.ctrlmessagefile = "";
      vm.errorform = false;
      vm.errorformfile = false;
      vm.successform = false;
      vm.successfile = false;
      vm.submitForm = false;
      vm.this_code_menage = $stateParams.obj.code_menage;

        vm.formData = {};
      // PREREMPLIR LES SEXES
        vm.allsexes = [{'id':'M','sexe':'Masculin'},{'id':'F','sexe':'Féminin'}];

    // Gestion de l'envoi des fichiers sur le serveur
        var uploader = $scope.uploader = new FileUploader({
            url: server_url + 'menage/saveinfos',
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + $window['localStorage'].satellizer_token },
        });

        // Filtre
        var supportedFileFormat = [
            'image/jpeg','image/gif','image/png'];
        uploader.filters.push({
            name: 'filtrefile',
            fn: function(item,options) {
                    if (_.contains(supportedFileFormat, MimeType.lookup((item.name))))
                        {
                            if(item.size <= 1048576)  return true; // <--1 Mo //  1048576(o) = 1Mo = 1024 * 1024 (1o)
                        }      
                    return false;
            }
        });

        uploader.onAfterAddingFile = function(fileItem) {
            vm.errorformfile = false;
            vm.successfile = true;
            vm.ctrlmessagefile = "";
        }

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            vm.errorformfile = true;
            vm.successfile = false;
            vm.ctrlmessagefile = "Format incorrect ou taille limite dépassée";
        }

        uploader.onBeforeUploadItem = function(item) {
             item.formData = [{
                current_module_id: $rootScope.UserConnected.current_module_id,
                code_menage:vm.formData.code_menage,
                nom_cdm:vm.formData.nom_cdm,
                prenom_cdm:vm.formData.prenom_cdm,
                surnom_cdm:vm.formData.surnom_cdm,
                age_cdm:vm.formData.age_cdm,
                sexe_cdm:vm.formData.sexe_cdm.id,
                statut_actuel:parseInt(vm.formData.statut_actuel.value),
                photo_cdm:vm.formData.new_photo_cdm,
            }];
            
        }
    
        uploader.onSuccessItem = function(item, response,status,headers) {
            vm.submitForm = false;
            if(status == 200) {
                vm.successform = true;
                vm.errorform = false;
                vm.formData.photo_cdm;
                getInfosMenage(vm.this_code_menage);
                uploader.clearQueue();
                vm.ctrlmessage = response.message;
            }
            else {
                vm.errorform = true;
                vm.successform = false;
                vm.ctrlmessage = response.message;
            }
        }

        uploader.onErrorItem = function (item, response,status,headers) {
            vm.submitForm = false;
            vm.errorform = true;
            vm.successform = false;
            vm.ctrlmessage = response.message;
        }

      function getInfosMenage(code_menage) {
          vm.isSearching = true;
          vm.errorSearch = false;
            var params =  {
                current_module_id : $rootScope.UserConnected.current_module_id,
                code_menage : code_menage
            }
            Model.getInfosMenage(params)
                .then(function () {
                    vm.infosmenage = Model.infosmenage;
                    vm.isSearching = false;
                    // Setters in value
                    vm.formData.code_menage = vm.infosmenage.code_menage;
                    vm.formData.nom_cdm = vm.infosmenage.nom_cdm;
                    vm.formData.prenom_cdm = vm.infosmenage.prenom_cdm;
                    vm.formData.surnom_cdm = vm.infosmenage.surnom_cdm;
                    vm.formData.telephone_cdm = vm.infosmenage.telephone_cdm;
                    vm.formData.age_cdm = vm.infosmenage.age_cdm;
                    vm.formData.sexe_cdm = {'id':vm.infosmenage.sexe_cdm};
                    vm.formData.statut_actuel = {"value":vm.infosmenage.statut_actuel};
                    vm.formData.photo_cdm = vm.infosmenage.photo_cdm;

                }, function (error) {
                    vm.infosmenage = error.data.message;
                    vm.errorSearch = true;
                    vm.isSearching = false;
            });
      }
      getInfosMenage(vm.this_code_menage);

      function getThismenage() {
          getInfosMenage(vm.this_code_menage);
      }

      function saveMenage(){
        vm.submitForm = true;
        if(uploader.queue.length > 0)
            uploader.uploadAll();
        else {
                var params = {
                    current_module_id: $rootScope.UserConnected.current_module_id,
                    code_menage:vm.formData.code_menage,
                    nom_cdm:vm.formData.nom_cdm,
                    prenom_cdm:vm.formData.prenom_cdm,
                    surnom_cdm:vm.formData.surnom_cdm,
                    age_cdm:vm.formData.age_cdm,
                    sexe_cdm:vm.formData.sexe_cdm.id,
                    statut_actuel:parseInt(vm.formData.statut_actuel.value)
                }
                Model.saveInfosMenage(params)
                    .then(function () {
                            vm.successform = true;
                            vm.errorform = false;
                            vm.submitForm = false;
                            getInfosMenage(vm.this_code_menage);
                            uploader.clearQueue();
                            vm.ctrlmessage = Model.callback.message;
                        }, function (error) {
                            vm.errorform = true;
                            vm.successform = false;
                            vm.submitForm = false;
                            vm.ctrlmessage = error.data.message;
                    })
                ;
            }
      }
 })

 ctrl.controller("ConsultListePaieInconditCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste des paiements inconditionnels";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
    
       var titleHtml = '<input type="checkbox" ng-model="listpinc.selectAll" ng-click="listpinc.toggleAll(listpinc.selectAll, listpinc.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_payement_menage] = false;
                return '<input type="checkbox" ng-model="listpinc.selected[' + data.id_payement_menage + ']" ng-click="listpinc.toggleOne(listpinc.selected)">';
            }),
            DTColumnBuilder.newColumn('annee','Année')
                .withOption('name','annee'),
            DTColumnBuilder.newColumn('mois','Mois')
                .withOption('name','mois'),
            DTColumnBuilder.newColumn('commune.lib_commune','Commune').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_menage','Code ménage')
                .withOption('name','code_menage'),
            DTColumnBuilder.newColumn('menage.nom_cdm','Nom Chef ménage')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('menage.prenom_cdm','Prénom(s) Chef ménage')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('montant','Montant')
                .withOption('name','montant')
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlistepaieincondit', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_payements:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_payements = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_payements.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_payements.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_payements = array_id_payements;
            }else if(type==='all') {

            }
            Model.exportListePaieIncondit(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-paiements-inconditionnels.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-paiements-inconditionnels.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }

})

 ctrl.controller("ConsultListePaieConditCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste des paiements conditionnels";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
    
       var titleHtml = '<input type="checkbox" ng-model="listpcond.selectAll" ng-click="listpcond.toggleAll(listpcond.selectAll, listpcond.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_payement_menage] = false;
                return '<input type="checkbox" ng-model="listpcond.selected[' + data.id_payement_menage + ']" ng-click="listpcond.toggleOne(listpcond.selected)">';
            }),
            DTColumnBuilder.newColumn('annee','Année')
                .withOption('name','annee'),
            DTColumnBuilder.newColumn('mois','Mois')
                .withOption('name','mois'),
            DTColumnBuilder.newColumn('commune.lib_commune','Commune').notSortable()
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_menage','Code ménage')
                .withOption('name','code_menage'),
            DTColumnBuilder.newColumn('menage.nom_cdm','Nom Chef ménage')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('menage.prenom_cdm','Prénom(s) Chef ménage')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('montant','Montant')
                .withOption('name','montant')
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlistepaiecondit', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_payements:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_payements = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_payements.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_payements.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_payements = array_id_payements;
            }else if(type==='all') {

            }
            Model.exportListePaieCondit(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-paiements-conditionnels.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-paiements-conditionnels.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }

})

 ctrl.controller("ConsultListeParticipTmicCtrl", function($sce,$window,moment,DTOptionsBuilder,DTColumnBuilder,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location,$compile) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste des individus participant aux TMIC (titulaire et suppléant)";

        var vm = this;
        vm.selected = {};
        vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.exportListe = exportListe;
        vm.RunExportListe = false;

        vm.errorform = false;
        vm.successform = false;
        vm.ctrlmessage = "";

        $scope.trust = $sce.trustAsHtml;

        vm.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];
    
    
       var titleHtml = '<input type="checkbox" ng-model="tmicpartic.selectAll" ng-click="tmicpartic.toggleAll(tmicpartic.selectAll, tmicpartic.selected)">';
       vm.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .withOption('searchable',false)
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id_tmicparticipant] = false;
                return '<input type="checkbox" ng-model="tmicpartic.selected[' + data.id_tmicparticipant + ']" ng-click="tmicpartic.toggleOne(tmicpartic.selected)">';
            }),
            DTColumnBuilder.newColumn('menage.village.arrondissement.commune.lib_commune','Commune').notSortable()
                .withOption('Searchable',false),
            DTColumnBuilder.newColumn('menage.village.lib_village','Village')
                .withOption('searchable',false),
            DTColumnBuilder.newColumn('code_cdm','Code ménage')
                .withOption('name','code_cdm'),
            DTColumnBuilder.newColumn('nom','Nom Participant')
                .withOption('name','nom'),
            DTColumnBuilder.newColumn('prenom','Prénom(s) Participant')
                .withOption('name','prenom'),        
            DTColumnBuilder.newColumn('age','Age')
                .withOption('name','age'), 
            DTColumnBuilder.newColumn('sexe','Sexe')
                .withOption('name','sexe'),
            ];
           
        vm.dtOptions =  DTOptionsBuilder.newOptions()
                .withFnServerData((sSource, aoData, fnCallback, oSettings) => {
                    $http.post(server_url+'consultlistepartictmic', {
                        start: aoData[3].value,
                        length: aoData[4].value,
                        draw: aoData[0].value,
                        order: aoData[2].value,
                        search: aoData[5].value,
                        columns: aoData[1].value
                    }).then((data) => {
                        fnCallback(data.data);
                    });
                })
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('order', [[0, 'asc']])
                .withOption('lengthMenu',[[10, 25, 50,100,500], [10, 25, 50,100,500]])
                .withDataProp('data')
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function(header) {
                    if (!vm.headerCompiled) {
                        // Use this headerCompiled field to only compile header once
                        vm.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withPaginationType('simple_numbers');

        function toggleAll (selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if(!selectedItems[id]) {
                        vm.selectAll = false;
                        return;
                    }
                }
            }
            vm.selectAll = true;
        }

        function exportListe(type,format) {
            vm.RunExportListe = true;
            vm.errorform = false;
            vm.ctrlmessage ="";
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id,
                type:type,
                format:format,
                id_participants:null
            }
            if(type==='select') {
                var chekIsEmpty = true;
                var array_id_participants = [];
                if(!vm.selectAll)  {
                    angular.forEach(vm.selected, function (value,i) {
                        if(value===true) {
                            array_id_participants.push(i);
                            chekIsEmpty = false;
                        }
                    });
                }else  {
                    chekIsEmpty = false;
                    angular.forEach(vm.selected, function (value,i) {
                            array_id_participants.push(i);
                    });
                }

                if(chekIsEmpty) {
                    alert('Veuillez sélectionner au moins un élément');
                    vm.RunExportListe = false;
                    return;
                }
                
                params.id_participants = array_id_participants;
            }else if(type==='all') {

            }
            Model.exportListeParticpTmic(params)
                .then(function() {
                    if(params.format === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"exportations-liste-participants-tmic.xlsx");
                    }else if(params.format === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"exportations-liste-participants-tmic.pdf");
                    }
                    vm.RunExportListe = false;
                }, function(error){
                    vm.RunExportListe = false;
                    vm.errorform = true;
                    vm.successform = false;
                    vm.ctrlmessage = "Une erreur est survenue ! Veuillez réessayer ou contactez l'administrateur système";
                }); 
        }
})

ctrl.controller("ConsultListeTmicCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Liste TMICS";

      $scope.table = {};
      $scope.table.errorCallBack = true;
      $scope.table.ctrlmessage = ""; 

      $scope.table.isSearching = true;

      var getListStructures = function () {
          Model.getListStructures()
            .then(function () {
                $scope.structures = Model.structures;
                $scope.table.errorCallBack = false;
                $scope.table.isSearching = false;
            }, function (error) {
                $scope.table.isSearching = false;
                $scope.errorCallBack = true;
                $scope.ctrlmessage = error.data.message;
            });
      }
       getListStructures();
})

ctrl.controller("ConsultDocProjetCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Consulter les documents liés au projet";

      $scope.table = {};
      $scope.table.errorCallBack = true;
      $scope.table.ctrlmessage = ""; 

      $scope.table.isSearching = true;

      var getListDocsProjet = function () {
            var params = {
                current_module_id : $rootScope.UserConnected.current_module_id,
            }
          Model.getListDocsProjet(params)
            .then(function () {
                $scope.docs = Model.docs;
                $scope.table.errorCallBack = false;
                $scope.table.isSearching = false;
            }, function (error) {
                $scope.table.isSearching = false;
                $scope.errorCallBack = true;
                $scope.ctrlmessage = error.data.message;
            });
      }
       getListDocsProjet();
})

ctrl.controller("StatBeneficDepartCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Statistiques bénéficiaires par département";

      $scope.dataPage = {};
      $scope.errorCallBack = true;
      $scope.ctrlmessage = ""; 
      $scope.isSearching = true;
      $scope.errorform = false;
      $scope.isCommunePage = false;

      var getListDepartement = function () {
          Model.getListDepartement()
            .then(function () {
                $scope.departements = Model.departements;
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage = error.data.message;
            });
      }
       getListDepartement();

    var getTotalDepartHome = function () {
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id
        }
          Model.getTotalStatDepartHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.dataPage.totalhome = Model.totalhome;
            }, function (error) {
                console.log(error);
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }
       getTotalDepartHome();

       var getDataChartStatDepartHome = function () {
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id
        }
          Model.getDataChartStatDepartHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.isSearching = false;
                $scope.dataPage.labelschart = [];
                $scope.dataPage.labelsdatachart = [];
                if(Model.chartdata.length == 0) {
                    $scope.dataPage.labelschart = ['Aucun département'];
                    $scope.dataPage.labelsdatachart = ['0'];
                }else {
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelschart.push(value.lib_departement);
                    });
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelsdatachart.push(value.total_menage_benef);
                    });
                }
                $scope.dataPage.optionschart = {
                    title: {
                        display: true,
                        text: 'Nombre de bénéficiaires par département'
                    },
                    "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                        });
                        }
                    },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        }       
                }
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }
       getDataChartStatDepartHome();

       var getDataChartStatCommuneHome = function () {
           $scope.isSearching = true;
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            id_departement:$scope.dataPage.departement.id_departement
        }
          Model.getDataChartStatCommuneHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.isSearching = false;
                $scope.isCommunePage = true;
                $scope.dataPage.labelschart = [];
                angular.forEach(Model.chartdata, function(value,i) {
                    $scope.dataPage.labelschart.push(value.lib_commune);
                });
                $scope.dataPage.labelsdatachart = [];
                angular.forEach(Model.chartdata, function(value,i) {
                    $scope.dataPage.labelsdatachart.push(value.total_menage_benef);
                });
                
                $scope.dataPage.optionschart = {
                    title: {
                        display: true,
                        text: 'Département : '+ $rootScope.labelState +' -> Nombre de bénéficiaires par commune'
                    },
                    "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                        });
                        }
                    },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }],
                            xAxes: [{
                                // Change here
                                barPercentage: 0.2
                            }]
                        }       
                }
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }

      var getDataChartStatVillageHome = function () {
           $scope.isSearching = true;
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            id_commune:$scope.dataPage.commune.id_commune
        }
          Model.getDataChartStatVillageHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.isSearching = false;
                $scope.isCommunePage = true;
                $scope.dataPage.labelschart = [];
                $scope.dataPage.labelsdatachart = [];
                if(Model.chartdata.length == 0) {
                    $scope.dataPage.labelschart = ['Aucun village'];
                    $scope.dataPage.labelsdatachart = ['0'];
                }else {
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelschart.push(value.lib_village);
                    });
                    
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelsdatachart.push(value.total_menage_benef);
                    });
                }
                
                $scope.dataPage.optionschart = {
                    title: {
                        display: true,
                        text: $rootScope.labelState +' || Nombre de bénéficiaires par village'
                    },
                    "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                        });
                        }
                    },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }],
                            xAxes: [{
                                // Change here
                                barPercentage: 0.7
                            }]
                        }       
                }
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }

       $scope.getStatDepartement = function () {
           $scope.communes = $scope.dataPage.departement.communes;
           $rootScope.labelState = $scope.dataPage.departement.lib_departement;
           getDataChartStatCommuneHome();
       }

       $scope.getStatCommune = function () {
           $rootScope.labelState = 'Département >> '+$scope.dataPage.departement.lib_departement + ' || Commune >> '+ $scope.dataPage.commune.lib_commune;
           getDataChartStatVillageHome();
       }


})

ctrl.controller("StatBeneficCommuneCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Statistiques bénéficiaires par commune";

      $scope.dataPage = {};
      $scope.errorCallBack = true;
      $scope.ctrlmessage = ""; 
      $scope.isSearching = true;
      $scope.errorform = false;

      var getListCommune = function () {
          Model.getListCommune()
            .then(function () {
                $scope.communes = Model.communes;
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage = error.data.message;
            });
      }
       getListCommune();

       var getDataChartStatCommunesHome = function () {
           $scope.isSearching = true;
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id
        }
          Model.getDataChartStatCommunesHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.isSearching = false;
                $scope.dataPage.labelschart = [];
                $scope.dataPage.labelsdatachart = [];
                if(Model.chartdata.length == 0) {
                    $scope.dataPage.labelschart = ['Aucune commune'];
                    $scope.dataPage.labelsdatachart = ['0'];
                }else {
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelschart.push(value.lib_commune);
                    });
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelsdatachart.push(value.total_menage_benef);
                    });
                }
                
                $scope.dataPage.optionschart = {
                    title: {
                        display: true,
                        text: 'Nombre de bénéficiaires par commune'
                    },
                    "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                        });
                        }
                    },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        }       
                }
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }
        getDataChartStatCommunesHome();

      var getDataChartStatVillageHome = function () {
           $scope.isSearching = true;
        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            id_commune:$scope.dataPage.commune.id_commune
        }
          Model.getDataChartStatVillageHome(params)
            .then(function () {
                $scope.errorform = false;
                $scope.isSearching = false;
                $scope.dataPage.labelschart = [];
                $scope.dataPage.labelsdatachart = [];
                if(Model.chartdata.length == 0) {
                    $scope.dataPage.labelschart = ['Aucun village'];
                    $scope.dataPage.labelsdatachart = ['0'];
                }else {
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelschart.push(value.lib_village);
                    });
                    angular.forEach(Model.chartdata, function(value,i) {
                        $scope.dataPage.labelsdatachart.push(value.total_menage_benef);
                    });
                }
                
                $scope.dataPage.optionschart = {
                    title: {
                        display: true,
                        text: $rootScope.labelState +' || Nombre de bénéficiaires par village'
                    },
                    "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                        });
                        }
                    },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }],
                            xAxes: [{
                                // Change here
                                barPercentage: 0.7
                            }]
                        }       
                }
            }, function (error) {
                $scope.errorform = true;
                $scope.isSearching = false;
                $scope.ctrlmessage += error.data.message;
            });
      }

       $scope.getStatCommune = function () {
           $rootScope.labelState = 'Commune >> '+ $scope.dataPage.commune.lib_commune;
           getDataChartStatVillageHome();
       }


})

ctrl.controller("StatMultiCritaireCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Statistiques multicritères";
      $scope.dataPage = {};
      $scope.dataPage.communesSelect = {};
      $scope.dataPage.varibalesSelect  = {};
      $scope.dataPage.criteresSelect  = {};

      $scope.results = $sce.trustAsHtml;

      $scope.dataPage.labelSelectMultiple = {
        selectAll       : "Tout",
        selectNone      : "Aucun",
        reset           : "Réinitialiser",
        search          : "Rechercher...",
        nothingSelected : "Aucune sélection"
    }

    $scope.dataPage.statuts = [
        {'slug':'all','lib':'Tous les ménages'},
        {'slug':'benef','lib':'Bénéficiaires'},
        {'slug':'non_benef','lib':'Non bénéficiaires'}
    ]
    $scope.dataPage.statut = $scope.dataPage.statuts[0];

    $scope.formats = [{'slug':'excel','LibelleFormat':'Excel'},{'slug':'pdf','LibelleFormat':'PDF'}];

      var getListCommuneInProject = function () {
            var params =  {
                current_module_id:$rootScope.UserConnected.current_module_id
            }
            Model.getListCommuneInProject(params)
                .then(function() {
                    $scope.dataPage.communes  = Model.communes;
                    angular.forEach($scope.dataPage.communes, function (value,i) {
                        $scope.dataPage.communes[i].isSelected = true;
                    });
                }, function (error) {
                    console.info(error);
                });
      }
      getListCommuneInProject();

      var getListStatAttrib = function () {
            Model.getListStatAttrib()
                .then(function() {
                    $scope.dataPage.varibales  = Model.statattrib;
                    $scope.dataPage.criteres = [];
                    angular.forEach(Model.statattrib, function (value,i) {
                        if(value.statut == 1)
                            $scope.dataPage.criteres.push({'attribut':value.attribut,'label':value.label});
                    });
                }, function (error) {
                    console.info(error);
                });
      }
    getListStatAttrib();

    $scope.runFilterStat = function (exporter) {
        var params = [{
            current_module_id:$rootScope.UserConnected.current_module_id,
            statut:$scope.dataPage.statut.slug
        }]

        if(!angular.equals($scope.dataPage.varibalesSelect, []) && $scope.dataPage.varibalesSelect !=null){
                angular.forEach(params, function(obj){
                    obj.variable = $scope.dataPage.varibalesSelect[0].attribut;
                });
        }else {
            if(angular.equals($scope.dataPage.criteresSelect, []) || $scope.dataPage.criteresSelect ===null){
                alert('Sélectionner au moins un critère ou une variable !');
                return;
            }
        }
        if(angular.equals($scope.dataPage.communesSelect, []) || $scope.dataPage.communesSelect ===null){
            alert('Sélectionner au moins une commune !');
            return;
        }
        var array_communes = [];
        angular.forEach($scope.dataPage.communesSelect, function(value,i) {
            array_communes.push(value.id_commune);
        });
        angular.forEach(params, function(obj){
            obj.id_communes = array_communes;
        });

        var array_criteres = [];
        if(!angular.equals($scope.dataPage.criteresSelect, []) && $scope.dataPage.criteresSelect !=null){
            angular.forEach($scope.dataPage.criteresSelect, function(value,i) {
                array_criteres.push(value.attribut);
            });
            angular.forEach(params, function(obj){
                obj.criteres = array_criteres;
            });
        }
        if(exporter ==='') {
            var params2 = params[0];
            Model.getStatMultiCritere(params2)
            .then(function() {
                $scope.dataPage.statdatas = Model.statdatas;
            }, function(error) {
                console.log(error);
            });
        }else{
            angular.forEach(params, function(obj){
                obj.export = exporter;
            });
            var params2 = params[0];
            Model.exportStatMultiCritere(params2)
                .then(function() {
                    if(params2.export === 'excel') {
                        var blob = new Blob([Model.fileexport], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        saveAs(blob,"statistique-multicriteres.xlsx");
                    }else if(params2.export === 'pdf') {
                        var blob = new Blob([Model.fileexport], {type: "application/pdf"});
                        saveAs(blob,"statistique-multicriteres.pdf");
                    }
                }, function(error) {

                });
        }
        
    }
})

ctrl.controller("StatPaieInconditCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Statistiques des paiements inconditionnels effectués ";
      $scope.currentyear = new Date().getFullYear();
      $scope.annees = [];
      if($scope.currentyear > 2015) {
          diff = $scope.currentyear - 2015;
          for(i=0;i<=diff;i++) {
              $scope.annees.push({'annee':2015+i});
          }
      }
      
      $scope.allmonths = [{'mois':1,'lib_mois':'JANVIER'},{'mois':2,'lib_mois':'FEVRIER'},
      {'mois':3,'lib_mois':'MARS'},{'mois':4,'lib_mois':'AVRIL'},{'mois':5,'lib_mois':'MAI'},
      {'mois':6,'lib_mois':'JUIN'},{'mois':7,'lib_mois':'JUILLET'},{'mois':8,'lib_mois':'AOUT'},
      {'mois':9,'lib_mois':'SEPTEMBRE'},{'mois':10,'lib_mois':'OCTOBRE'},{'mois':11,'lib_mois':'NOVEMBRE'},
      {'mois':12,'lib_mois':'DECEMBRE'}];

      $scope.dataForm = {};
      $scope.dataForm.choiceannee = {};
      $scope.dataForm.mois = {};
      $scope.isSearching = false;

      var getStatPayIncondit = function () {
          $scope.isSearching = true;
          $scope.statdatas = {};
          var params = [{
                current_module_id : $rootScope.UserConnected.current_module_id   
            }]
            if(!angular.equals($scope.dataForm.choiceannee, {}) && $scope.dataForm.choiceannee !=null){
                angular.forEach(params, function(obj){
                    obj.annee = $scope.dataForm.choiceannee.annee;
                });
            }

            if(!angular.equals($scope.dataForm.mois, {}) && $scope.dataForm.mois !=null){
                angular.forEach(params, function(obj){
                    obj.mois = $scope.dataForm.mois.mois;
                });
            }
            var params2 = params[0];
          Model.getStatPayIncondit(params2)
            .then(function() {
                $scope.statdatas = Model.statdatas;
                $scope.isSearching = false;
            }, function (error) {
                $scope.isSearching = false;
                console.log(error);
            });

      }
    getStatPayIncondit();

    $scope.runFilterStat = function () {
        getStatPayIncondit();
    }





})

ctrl.controller("StatPaieConditCtrl", function($filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

      $rootScope.titrepage = "Statistiques des paiements conditionnels effectués ";

      $scope.isSearching = false;

      var getStatPayCondit = function () {
          $scope.isSearching = true;
          $scope.statdatas = {};
          var params = {
                current_module_id : $rootScope.UserConnected.current_module_id   
            }
            
          Model.getStatPayCondit(params)
            .then(function() {
                $scope.statdatas = Model.statdatas;
                $scope.isSearching = false;
            }, function (error) {
                $scope.isSearching = false;
                console.log(error);
            });

      }
    getStatPayCondit();
})

ctrl.controller("CalculScoresPmtCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

        $rootScope.titrepage = "Calcul des scores PMT";
        $scope.errorform = false;
        $scope.successform = false;
        $scope.calculing = false;
        $scope.trust = $sce.trustAsHtml;
        $scope.runCalculScorePmt =  function () {
            $scope.calculing = true;
            var params = {
                current_module_id:$rootScope.UserConnected.current_module_id
            }
            Model.CalculScorePmt(params)
                .then(function() {
                    $scope.errorform = false;
                    $scope.successform = true;
                    $scope.ctrlmessage = Model.results;
                    $scope.calculing = false;
                }, function(error) {
                    $scope.errorform = true;
                    $scope.successform = false;
                    $scope.ctrlmessage = error;
                    $scope.calculing = false;
            });
      }

})

ctrl.controller("GenererCartesCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

        $rootScope.titrepage = "Génération des cartes";
        $scope.errorform = false;
        $scope.successform = false;
        $scope.calculing = false;
        $scope.trust = $sce.trustAsHtml;

})

ctrl.controller("GenererListeExcelCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

        $rootScope.titrepage = "Génération des listes excel";
        $scope.errorform = false;
        $scope.successform = false;
        $scope.running = false;
        $scope.trust = $sce.trustAsHtml;
        $scope.dataPage = {}
        $scope.dataPage.communesSelect = {};
        $scope.dataPage.typetransfertSelect  = {};

        $scope.results = $sce.trustAsHtml;

        $scope.dataPage.labelSelectMultiple = {
        selectAll       : "Tout",
        selectNone      : "Aucun",
        reset           : "Réinitialiser",
        search          : "Rechercher...",
        nothingSelected : "Aucune sélection"
    }

    $scope.dataPage.typestransfert = [
        {'slug':'cash','lib':'CASH'},
        {'slug':'tmic','lib':'TMIC'}
    ]

    var getListCommuneInProject = function () {
            var params =  {
                current_module_id:$rootScope.UserConnected.current_module_id
            }
            Model.getListCommuneInProject(params)
                .then(function() {
                    $scope.dataPage.communes  = Model.communes;
                    angular.forEach($scope.dataPage.communes, function (value,i) {
                        $scope.dataPage.communes[i].isSelected = true;
                    });
                }, function (error) {
                    console.info(error);
                });
      }
    getListCommuneInProject();

    $scope.runProductExcel = function () {
        $scope.running = true;
        if(angular.equals($scope.dataPage.typetransfertSelect, []) || $scope.dataPage.typetransfertSelect ===null){
            alert('Sélectionner le type de transfert !');
            $scope.running = false;
            return;
        }
        if(angular.equals($scope.dataPage.communesSelect, []) || $scope.dataPage.communesSelect ===null){
            alert('Sélectionner au moins une commune !');
            $scope.running = false;
            return;
        }
        var array_communes = [];
        angular.forEach($scope.dataPage.communesSelect, function(value,i) {
            array_communes.push(value.id_commune);
        });

        var params = {
            current_module_id:$rootScope.UserConnected.current_module_id,
            typetransfert:$scope.dataPage.typetransfertSelect[0].slug,
            id_communes:array_communes
        }
        console.info(params);
        Model.GenererListeExcel(params)
            .then(function() {
                var blob = new Blob([Model.fileexport], {type: "application/zip"});
                saveAs(blob,"liste-excels-generees.zip");
                $scope.running = false;
            }, function(error) {
                $scope.running = false;
                console.log(error);
            });

    }



})

ctrl.controller("GenererCartesCtrl", function($sce,$filter,$http,$scope,$rootScope, $log, Model, Utilitaire, $timeout, $stateParams, _, $uibModal, $state,$location) {
    
    // VERIFIER SI L'UTILISATEUR EST CONNECTE (DOUBLE AUTHENTIFICATION)
     $http.get(server_urlcheckauth).success(function() {
          $rootScope.UserConnected = Utilitaire.ControllerUserConnect();
          if($rootScope.UserConnected === null)
              $state.go('login');
          }).error(function(error) {
              $state.go('login');
      });

        $rootScope.titrepage = "Génération des cartes";
        $scope.errorform = false;
        $scope.successform = false;
        $scope.running = false;
        $scope.trust = $sce.trustAsHtml;
        $scope.dataPage = {}
        $scope.dataPage.communesSelect = {};
        $scope.dataPage.typetransfertSelect  = {};

        $scope.results = $sce.trustAsHtml;

        $scope.dataPage.labelSelectMultiple = {
        selectAll       : "Tout",
        selectNone      : "Aucun",
        reset           : "Réinitialiser",
        search          : "Rechercher...",
        nothingSelected : "Aucune sélection"
    }

    $scope.dataPage.typestransfert = [
        {'slug':'cash','lib':'CASH'},
        {'slug':'tmic','lib':'TMIC'}
    ]

    $scope.maxDate = new Date();
    $scope.dataPage.getfromdate = new Date();
    
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date(2015,1,1);
    };
    $scope.toggleMin();

    $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
   };

    $scope.setDate = function(year, month, day) {
        $scope.dataPage.getfromdate = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate','fullDate'];
    $scope.format = $scope.formats[2];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i=0;i<$scope.events.length;i++){
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
            return $scope.events[i].status;
            }
        }
        }
        return '';
    };

    $scope.dataPage.setShowfromdate = false;

    var getListCommuneInProject = function () {
            var params =  {
                current_module_id:$rootScope.UserConnected.current_module_id
            }
            Model.getListCommuneInProject(params)
                .then(function() {
                    $scope.dataPage.communes  = Model.communes;
                    angular.forEach($scope.dataPage.communes, function (value,i) {
                        $scope.dataPage.communes[i].isSelected = true;
                    });
                }, function (error) {
                    console.info(error);
                });
      }
    getListCommuneInProject();

    $scope.runProductCard = function () {
        $scope.running = true;
        if(angular.equals($scope.dataPage.typetransfertSelect, []) || $scope.dataPage.typetransfertSelect ===null){
            alert('Sélectionner le type de transfert !');
            $scope.running = false;
            return;
        }
        if(angular.equals($scope.dataPage.communesSelect, []) || $scope.dataPage.communesSelect ===null){
            alert('Sélectionner au moins une commune !');
            $scope.running = false;
            return;
        }
        
        var array_communes = [];
        angular.forEach($scope.dataPage.communesSelect, function(value,i) {
            array_communes.push(value.id_commune);
        });

        var params = [{
            current_module_id:$rootScope.UserConnected.current_module_id,
            typetransfert:$scope.dataPage.typetransfertSelect[0].slug,
            id_communes:array_communes
        }]
        if($scope.dataPage.setShowfromdate) {
            var getfromdate = $filter('date')($scope.dataPage.getfromdate,'yyyy-MM-dd');
            angular.forEach(params, function(obj){
                obj.getfromdate = getfromdate;
            });
        }

        var params2 = params[0];

        Model.GenererCartes(params2)
            .then(function() {
                var blob = new Blob([Model.fileexport], {type: "application/zip"});
                saveAs(blob,"liste-cartes-generees.zip");
                $scope.running = false;
            }, function(error) {
                $scope.running = false;
                console.log(error);
            });

    }



})
