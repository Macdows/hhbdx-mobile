angular.module('hhbdxLoginCtrl', ['ionic'])

.controller('LoginCtrl', function($scope) {
  $scope.data = {};
  $scope.login = function() {
    console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
  }
});
