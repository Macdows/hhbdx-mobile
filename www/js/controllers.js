angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicPopup, $ionicPopover, ClosePopupService) {

  /*$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/

  $scope.showFilter = false;
  $scope.distMax = 2500;

  $scope.filters = {
    beer: false,
    wine: false,
    cocktail: false
  };

  $scope.pubs = [{
    id: 1,
    name: "Mushroom",
    distance: 450,
    location: "Gambetta",
    happyStart: 17,
    happyEnd: 20,
    price: 3.50,
    image: "img/mushroom.jpg",
    mainDrinkType: "Beer",
    secondDrinkType: "Cocktail",
    rating: [4.2]
  }, {
    id: 2,
    name: "Camelot",
    distance: 1535,
    location: "La Victoire",
    happyStart: 17.30,
    happyEnd: 19,
    price: 3.50,
    image: "img/camelot.jpg",
    mainDrink: "Cocktail",
    secondDrinkType: "Beer",
    rating: [3.8]
  }, {
    id: 3,
    name: "Titi Twister",
    distance: 1475,
    location: "La Victoire",
    happyStart: 18,
    happyEnd: 21,
    price: 3.50,
    image: "img/titi.jpg",
    mainDrink: "Beer",
    secondDrinkType: "Wine",
    rating: [4.6, 3.9]
  },
  {
    id: 1,
    name: "Mushroom",
    distance: 450,
    location: "Gambetta",
    happyStart: 17,
    happyEnd: 20,
    price: 3.50,
    image: "img/mushroom.jpg",
    mainDrinkType: "Beer",
    secondDrinkType: "Cocktail",
    rating: [4.2]
  }, {
    id: 2,
    name: "Camelot",
    distance: 1535,
    location: "La Victoire",
    happyStart: 17.30,
    happyEnd: 19,
    price: 3.50,
    image: "img/camelot.jpg",
    mainDrink: "Cocktail",
    secondDrinkType: "Beer",
    rating: [3.8]
  }, {
    id: 3,
    name: "Titi Twister",
    distance: 1475,
    location: "La Victoire",
    happyStart: 18,
    happyEnd: 21,
    price: 3.50,
    image: "img/titi.jpg",
    mainDrink: "Beer",
    secondDrinkType: "Wine",
    rating: [4.6, 3.9]
  }];

  /* $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {

      console.log("coucou");
      $scope.popover = popover;
    }); */

  // Triggered on a button click, or some other target
  $scope.showInfo = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: "templates/popup.html",
    title: 'Bars',
    cssClass: 'barsPopup',
    scope: $scope
  });
  ClosePopupService.register(myPopup);
  };


  navigator.geolocation.getCurrentPosition(function(pos) {
    var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
       var mapOptions = {
           disableDefaultUI: true,
           center: myLatlng,
           zoom: 16,
           mapTypeId: google.maps.MapTypeId.TERRAIN
       };

       var map = new google.maps.Map(document.getElementById('map'),
           mapOptions);

       var marker = new google.maps.Marker({
           position: myLatlng,
           map: map
       });
       $scope.map = map;
       //$ionicLoading.hide();
     }, function(error) {
       alert('Unable to get location: ' + error.message);
     });
});
