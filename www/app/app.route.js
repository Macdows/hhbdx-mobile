var app = angular.module('hhbdxRouter', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu-left/menu.html',
    controller: 'MenuCtrl'
  })

  .state('app.bar', {
    url: '/bar/:barId',
    views: {
      'menuContent': {
        templateUrl: 'app/bar/bar.html',
        controller: 'BarDetailCtrl'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      }
    }
  });

  // if none of the states are matched follow
  $urlRouterProvider.otherwise('app/map');

});
