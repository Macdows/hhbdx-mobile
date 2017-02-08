angular.module('hhbdxBarCtrl', ['ionic'])

.controller('BarDetailCtrl', function($scope, $stateParams, $http, $ionicPopup) {

  var thisId = $stateParams.barId;

  $scope.hideOnClick = function(item)
  {
    $scope[item] = !$scope[item];
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



  $http.get('../../database/database.json').success(function(response) {
    $scope.pubs = response;
    $scope.pub = $scope.pubs[thisId - 1];
    rateAvg();

    $scope.showRating = function() {
      $scope.data = {}
      $scope.myPopup = $ionicPopup.show({
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

        $scope.myPopup.then(function(res) {
          if(res != null)
          {
            $scope.pub.rating.push(parseInt(res));
            rateAvg();
          }
        });

    };
  });


  function rateAvg() {
    $scope.ratingAvg = 0;
    for (var i = 0; i < $scope.pub.rating.length; i++) {
      $scope.ratingAvg += $scope.pub.rating[i];
    }

    $scope.ratingAvg /= $scope.pub.rating.length;
    $scope.ratingAvg = $scope.ratingAvg.toFixed(1);
  }

});
