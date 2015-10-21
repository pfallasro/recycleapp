angular.module('starter.controllers', [])

  .controller('ProfileCtrl', function ($scope, $ionicModal, $cordovaBarcodeScanner) {

    $scope.score = 100;

    $scope.scarBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $scope.score += 50;
        console.log(imageData.text);
        console.log('format ' + imageData.format);
      }, function (error) {
        console.log('An error happend' + error);
      });
    };

  })

  .controller('TopCtrl', function ($scope, TopRecyclers) {
    $scope.topRecyclers = TopRecyclers.all();
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, TopRecyclers) {
    $scope.chat = TopRecyclers.get($stateParams.chatId);
  })

  .controller('ActivitiesCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('InfoCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('LoginCtrl', function ($scope, $localstorage, $ionicModal, $state, $ionicPopup, LoginService, RegisterService) {

    $ionicModal.fromTemplateUrl('templates/modals/register-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.init();
      $scope.modal.hide();
    };

    $scope.doRegister = function (name, pw, confirmedPw) {
      RegisterService.registerUser(name, pw, confirmedPw).success(function (data) {
        console.log(data);
        $scope.closeModal();
      }).error(function (data) {
        console.log(data);
        var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: 'Please make sure the password is the same!'
        });
      });
    };

    $scope.doLogin = function (username, password) {
      LoginService.loginUser(username, password).success(function (data) {
        console.log(data);
        $state.go('tab.profile');
      }).error(function (data) {
        console.log(data);
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    };

    $scope.init = function () {
      $scope.username = '';
      $scope.password = '';
    };

    $scope.init();

  });


