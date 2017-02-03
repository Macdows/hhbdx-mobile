angular.module('hhbdxFilters', [])

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
