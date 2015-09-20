angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
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
        $state.go('tab.dash');
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
