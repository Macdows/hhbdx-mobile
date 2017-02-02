// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'BarDetail', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('ClosePopupService', function($document, $ionicPopup, $timeout){
  var lastPopup;
  return {
    register: function(popup) {
      $timeout(function(){
        var element = $ionicPopup._popupStack.length>0 ? $ionicPopup._popupStack[0].element : null;
        if(!element || !popup || !popup.close) return;
        element = element && element.children ? angular.element(element.children()[0]) : null;
        lastPopup  = popup;
        var insideClickHandler = function(event){
          event.stopPropagation();
        };
        var outsideHandler = function() {
          popup.close();
        };
        element.on('click', insideClickHandler);
        $document.on('click', outsideHandler);
        popup.then(function(){
          lastPopup = null;
          element.off('click', insideClickHandler);
          $document.off('click', outsideHandler);
        });
      });
    },
    closeActivePopup: function(){
      if(lastPopup) {
        $timeout(lastPopup.close);
        return lastPopup;
      }
    }
  };
})

.filter('distFilter', function () {
  return function (items, dist) {
  var filtered = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.distance <= parseInt(dist)) {
      filtered.push(item);
    }
  }
  return filtered;
  };
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.bar', {
    url: '/bar/:barId',
    views: {
      'menuContent': {
        templateUrl: 'templates/bar.html',
        controller: 'BarDetailCtrl'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
