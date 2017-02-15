angular.module('hhbdxFavouritesCtrl', ['ionic'])

.controller('FavouritesCtrl', function($scope, $stateParams, $http, $ionicPopup) {
  $http.get('../../database/database.json').success(function(response) {
    $scope.myFavorites = [];
    console.log('response', response);
    angular.forEach(response, function(value, key) {
      if (value.isFavourite) {
        this.push(value);
      }
    }, $scope.myFavorites);
    console.log($scope.myFavorites);
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
