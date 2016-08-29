var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/cats", {
      templateUrl: "/views/partials/cats.html",
      controller: "catController"
    }).
    when("/dogs", {
      templateUrl: "/views/partials/dogs.html",
      controller: "dogController"
    }).
    when("/smallfurry", {
      templateUrl: "/views/partials/smallfurry.html",
      controller: "smallController"
    }).
    otherwise({
      redirectTo: "/cats"
    });

}]);

myApp.controller("catController", ["$scope", "$http", function($scope, $http) {
  console.log("working")
  var key = 'b900e0d5e332753a460a64eaa8de00fd';
  var baseURL = 'http://api.petfinder.com/';


    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=cat';
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      $scope.cat = response.data.petfinder.pet;

    });

}]);

  myApp.controller("dogController", ["$scope", "$http", function($scope, $http) {
    var key = 'b900e0d5e332753a460a64eaa8de00fd';
    var baseURL = 'http://api.petfinder.com/';

      var query = baseURL + 'pet.getRandom';
      query += '?key=' + key;
      query += '&animal=dog';
      query += '&output=basic';
      query += '&format=json';

      console.log('query: ', query);

      var request = encodeURI(query) + '&callback=JSON_CALLBACK';

      $http.jsonp(request).then(function(response) {
        $scope.dog = response.data.petfinder.pet;

      });

  }]);

    myApp.controller("smallController", ["$scope", "$http", function($scope, $http) {
      var key = 'b900e0d5e332753a460a64eaa8de00fd';
      var baseURL = 'http://api.petfinder.com/';


        var query = baseURL + 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=smallfurry';
        query += '&output=basic';
        query += '&format=json';

        console.log('query: ', query);

        var request = encodeURI(query) + '&callback=JSON_CALLBACK';

        $http.jsonp(request).then(function(response) {
          $scope.small = response.data.petfinder.pet;

        });


}]);
