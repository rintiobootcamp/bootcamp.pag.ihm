angular.module('pag-site')
  .controller("WidgetChatCtrl", function ($scope, ModelWidget, ModelProjet) {
    $scope.data = {};

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
              date: moment.now()
            }
            $scope.data.messages.push(obj);
          }

          var textSend = '';
          if($scope.listProjets.length > 0 ){
            angular.forEach($scope.listProjets, function (value, i){
              textSend = textSend + value.nom + '\n';
            });
            var obj2 = {
              id: moment.now() + Math.random(),
              avatar:'/assets/images/bot-icon.svg',
              text: textSend,
              userId: '1',
              date: moment.now()
            }
            $scope.data.messages.push(obj2);
          }
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getProjet = function (id){
      sendWaiting();
      ModelProjet.get(id)
        .then( function (data){
          $scope.projet = data.data;
          console.log($scope.projet);
          var obj = {
            id: moment.now() + Math.random(),
            avatar:'/assets/images/bot-icon.svg',
            text: 'Le projet du PAG.',
            userId: '1',
            date: moment.now()
          }
          $scope.data.messages.push(obj);
        }, function(error){
          console.log(error);
          sendErrorResponse();
        });
    }

    var getCountSecteur = function (){
      sendWaiting();
      $scope.countSecteur = 9;
      var obj = {
        id: moment.now() + Math.random(),
        avatar:'/assets/images/bot-icon.svg',
        text: 'Le Programme d\'Actions du Gouvernement est composé de ' + $scope.countSecteur + ' secteurs',
        userId: '1',
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
        date: moment.now()
      }
      $scope.data.messages.push(obj);
    }

    $scope.sendMessage = function (message){
      ModelWidget.get(message.text)
        .then(function(data){
          var respText = data.data.result.fulfillment.speech;
          switch (respText) {
            case "référence service liste projet":
              getListProjets();
              break;
            case "Choisissez dans la liste suivante le numéro correspond au projet recherché.":
              getListProjets(respText);
              break;
            case "référence service projet1":
              getProjet(2);
              break;
            case "nombre secteur":
              getCountSecteur();
              break;
            default:
              var obj = {
                id: moment.now() + Math.random(),
                avatar:'/assets/images/bot-icon.svg',
                text: respText,
                userId: '1',
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
          text: 'Bienvenue sur Veille citoyenne ! Posez-moi vos préoccupations et je vous répondrez.',
          userId: '1',
          userName: 'Robot',
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

