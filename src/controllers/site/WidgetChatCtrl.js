angular.module('pag-site')
  .controller("WidgetChatCtrl", function ($scope, ModelWidget, ModelProjet, ModelSecteur, ModelPilier, ModelAxe, cookieModel) {
    $scope.data = {};

    var checkCookie = cookieModel.getPreferences();
    if(checkCookie.sitevisited === false){
       // Site is never visited by user
       $scope.data.toogle = true;

      var setCookie = cookieModel.setPreferences('sitevisited',true);
      if(setCookie.STATUS === 300) {
          toogleToaster('error','Alerte',setCookie.STATUS.message);
      }
    }

    var getListProjets = function (responseBot){
      sendWaiting();
      ModelProjet.list()
        .then( function (data){
          $scope.listProjets = data.data;
          if(responseBot != undefined) {
            var obj = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: responseBot,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj);
          }

          var textSend = '';
          if($scope.listProjets.length > 0 ){
            angular.forEach($scope.listProjets, function (value, i){
              textSend = textSend + ' - ' + value.nom + '\n';
            });
            var obj2 = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: textSend,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj2);
          }
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getCountEntity = function (entityType){
      sendWaiting();
      switch (entityType) {
        case 'pilier':
          ModelAxe.countPiliers()
            .then(function (data){ showBotMsgCount(data.data.count, entityType);}, function (errr){ console.log(error);});
          break;
        case 'axe':
          ModelAxe.countAxes()
          .then(function (data){ showBotMsgCount(data.data.count, entityType);}, function (errr){ console.log(error);});
            break;
        case 'secteur':
          ModelAxe.countSecteurs()
          .then(function (data){ showBotMsgCount(data.data.count, entityType);}, function (errr){ console.log(error);});
            break;
        case 'projet':
          ModelAxe.countProjets()
          .then(function (data){ showBotMsgCount(data.data.count, entityType);}, function (errr){ console.log(error);});
            break;
        default:
          showBotMsgCount(0, entityType);
          break;
      }
    }

    var showBotMsgCount = function (total, entityType){
      var obj = {
        id: moment.now() + Math.random(),
        avatar:'/assets/images/bot-icon.svg',
        text: 'Le Programme d\'Actions du Gouvernement est composé de ' + total + ' ' + entityType + ( total > 1 ? 's' :'' ) ,
        userId: '1',
        userName: 'VeilleBot',
        date: moment.now()
      }
      $scope.data.messages.push(obj);
    }

    var getListSecteurs =  function (responseBot){
      sendWaiting();
      ModelSecteur.list()
        .then( function (data){
          $scope.listSecteurs = data.data;
          if(responseBot != undefined) {
            var obj = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: responseBot,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj);
          }

          var textSend = '';
          if($scope.listSecteurs.length > 0 ){
            angular.forEach($scope.listSecteurs, function (value, i){
              textSend = textSend + (i + 1) + '- ' + value.nom + '\n';
            });
            var obj2 = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: textSend,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj2);
          }
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getListAxes =  function (responseBot){
      sendWaiting();
      ModelAxe.list()
        .then( function (data){
          $scope.listAxes = data.data;
          if(responseBot != undefined) {
            var obj = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: responseBot,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj);
          }

          var textSend = '';
          if($scope.listAxes.length > 0 ){
            angular.forEach($scope.listAxes, function (value, i){
              textSend = textSend + (i + 1) + ' - ' + value.nom + '\n';
            });
            var obj2 = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: textSend,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj2);
          }
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getListPiliers =  function (responseBot){
      sendWaiting();
      ModelPilier.list()
        .then( function (data){
          $scope.listPiliers = data.data;
          if(responseBot != undefined) {
            var obj = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: responseBot,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj);
          }

          var textSend = '';
          if($scope.listPiliers.length > 0 ){
            angular.forEach($scope.listPiliers, function (value, i){
              textSend = textSend + (i + 1) + ' - ' + value.nom + '\n';
            });
            var obj2 = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: textSend,
              userId: '1',
              userName: 'VeilleBot',
              date: moment.now()
            }
            $scope.data.messages.push(obj2);
          }
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getEntityById = function (entityType, entityId){
      sendWaiting();
      var params = {
        entityId:parseInt(entityId),
        entityType : entityType
      }
      console.log(params);
      switch (entityType) {
        case 'PILIER':
          ModelAxe.get(params)
            .then(function (data){ showBotMsgEntityById(data.data);}, function (errr){ console.log(error);});
          break;
        case 'AXE':
          ModelAxe.get(params)
          .then(function (data){ showBotMsgEntityById(data.data);}, function (errr){ console.log(error);});
            break;
        case 'SECTEUR':
          ModelAxe.get(params)
          .then(function (data){ showBotMsgEntityById(data.data);}, function (errr){ console.log(error);});
            break;
        case 'PROJET':
          ModelAxe.get(params)
          .then(function (data){ showBotMsgEntityById(data.data);}, function (errr){ console.log(error);});
            break;
        default:
          break;
      }
    }

    var showBotMsgEntityById = function (entity){
      var obj = {
        id: moment.now() + Math.random(),
        avatar:'/assets/images/bot-icon.svg',
        text:  entity.nom + '\n' + "Description : " + entity.description,
        userId: '1',
        userName: 'VeilleBot',
        date: moment.now()
      }
      $scope.data.messages.push(obj);
    }

    var sendWaiting = function (){
      var obj = {
        id: moment.now() + Math.random(),
        avatar:'/assets/images/bot-icon.svg',
        text: 'écrit...',
        userId: '1',
        userName: 'VeilleBot',
        date: moment.now()
      }
      $scope.data.messages.push(obj);
    }

    var sendErrorResponse =  function (){
      var obj = {
        id: moment.now() + Math.random(),
        avatar:'/assets/images/bot-icon.svg',
        text: 'Je rencontre des difficultés à vous servir actuellement !',
        userId: '1',
        userName: 'VeilleBot',
        date: moment.now()
      }
      $scope.data.messages.push(obj);
    }

    $scope.sendMessage = function (message){
      ModelWidget.get(message.text)
        .then(function(data){
          var respText = data.data.result.fulfillment.speech;
          switch (respText) {
            case "x20lp17":
              getListProjets();
              break;
            case "x20lp17oui":
              var param = "Choisissez dans la liste suivante le numéro correspond au projet recherché.";
              getListProjets(param);
              break;
            case "x20ls17":
              getListSecteurs();
              break;
            case "x20ls17oui":
              var param = "Quel secteur vous intéresse ?";
              getListSecteurs(param);
              break;
            case "x20la17":
              getListAxes();
              break;
            case "x20la17oui":
              var param = "Faites un choix pour avoir plus de détails";
              getListAxes(param);
              break;
            case "x20lpi17":
              getListPiliers();
              break;
            case "x20lpi17oui":
              var param = "Faites un choix dans la liste suivante";
              getListPiliers(param);
              break;
            case "x20npi17":
              getCountEntity('pilier');
              break;
            case "x20na17":
              getCountEntity('axe');
              break;
            case "x20ns17":
              getCountEntity('secteur');
              break;
            case "x20np17":
              getCountEntity('projet');
              break;
            case "x20pis17oui":
              getEntityById('PILIER',data.data.result.parameters.number);
              break;
            case "x20as17oui":
              getEntityById('AXE',data.data.result.parameters.number);
              break;
            case "x20ss17oui":
              getEntityById('SECTEUR',data.data.result.parameters.number);
              break;
            case "x20ps17oui":
              getEntityById('PROJET',data.data.result.parameters.number);
              break;
            default:
              var obj = {
                id: moment.now() + Math.random(),
                avatar:'/assets/images/bot-icon.svg',
                text: respText,
                userId: '1',
                userName: 'VeilleBot',
                date: moment.now()
              }
              $scope.data.messages.push(obj);
              break;
          }
        }, function (error){
          console.log(error);
        });
    }

    $scope.data.messages = [
      {
          id: moment.now(),
          text: 'Bienvenue sur Veille citoyenne ! Posez-moi vos préoccupations et je vous répondrai.',
          userId: '1',
          userName: 'VeilleBot',
          avatar: '/assets/images/bot-icon.svg',
          date: moment.now()
      }
    ];

    $scope.data.you = {userId: '4g965JUS785244zd55cecec', avatar: '/assets/images/profile.svg', userName: 'Moi'};

    $scope.toogleWidget = function (){
      $scope.data.toogle = true;
    }

    $scope.closeWidget = function (){
      $scope.data.toogle = false;
    }



  });

