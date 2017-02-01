angular.module('BarDetail', ['ionic'])


.controller('BarDetailCtrl', function($scope, $stateParams, $ionicPopup) {

  var thisId = $stateParams.barId;


  $scope.hideOnClick = function()
  {
    $scope.hideDrinks = !$scope.hideDrinks;
    console.log($scope.hideDrinks);
  }

  $scope.menuBeer = [{
    name: "Blonde",
    demie: 3,
    pinte: 5
  }, {
    name: "Brune",
    demie: 2.5,
    pinte: 5
  }, {
    name: "Blanche",
    demie: 2.5,
    pinte: 4
  }, {
    name: "Rousse",
    demie: 3,
    pinte: 5
  }]
  $scope.menuCocktail = [{
    name: "Long Island",
    price: 4
  }, {
    name: "Mojito",
    price: 5
  }, {
    name: "Caïpirina",
    price: 4
  }, {
    name: "Sex On The Beach",
    price: 4
  }]
  $scope.pubs = [{
    id: 1,
    name: "Mushroom",
    distance: 450,
    location: "Gambetta",
    happyStart: 17,
    happyEnd: 20,
    price: 3.50,
    mainDrinkType: "Beer",
    secondDrinkType: "Cocktail",
    position: {
      lat: 44.84057,
      lng: -0.58149
    },
    rating: [4.2]
  }, {
    id: 2,
    name: "Camelot",
    distance: 1535,
    location: "La Victoire",
    happyStart: 17.30,
    happyEnd: 19,
    price: 3.50,
    mainDrink: "Cocktail",
    secondDrinkType: "Beer",
    position: {
      lat: 44.83237,
      lng: -0.57107
    },
    rating: [3.8]
  }, {
    id: 3,
    name: "Titi Twister",
    distance: 1475,
    location: "La Victoire",
    happyStart: 18,
    happyEnd: 21,
    price: 3.50,
    mainDrink: "Beer",
    secondDrinkType: "Wine",
    position: {
      lat: 44.83175,
      lng: -0.56963
    },
    rating: [4.6, 3.9]
  }, ];



  $scope.pub = $scope.pubs[thisId - 1];

  rateAvg();

function rateAvg() {
  $scope.ratingAvg = 0;
  for (var i = 0; i < $scope.pub.rating.length; i++) {
    $scope.ratingAvg += $scope.pub.rating[i];
  }

  $scope.ratingAvg /= $scope.pub.rating.length;
  $scope.ratingAvg = $scope.ratingAvg.toFixed(1);
}


  $scope.showRating = function() {
    $scope.data = {}
    var myPopup = $ionicPopup.show({
      template: '<div class="row"><div class="col col-75"><input type="range" value="3" max="5" min="0" step="1" ng-model="data.userRating"></div><div class="col col-10 col-offset-10">{{data.userRating}}</div></div>',
      title: 'Rate this Pub !',
      scope: $scope,
      buttons: [{
        text: 'Cancel',
        type: 'button-dark button-clear',
      }, {
        text: '<b>Ok</b>',
        type: 'button-positive button-clear',
        onTap: function(e) {
          if (!$scope.data.userRating) {
               e.preventDefault();
            } else {
            return $scope.data.userRating;
          }
        }
      }, ]
    });
    myPopup.then(function(res) {
      if(res != null)
      {
        $scope.pub.rating.push(parseInt(res));
        rateAvg();
      }
    });

  };

    console.log($scope.pub.rating);

})
