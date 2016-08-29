var myApp = angular.module('myApp', ["ngRoute"]);
myApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "/views/partials/home.html",
      controller: "homeController"
    })
    .when('/favorite', {
      templateUrl: "/views/partials/favorite.html",
      controller: "favoriteController"
    })
    .otherwise({
      redirectTo: "/"
    });

}]);

myApp.controller("homeController", ["$scope", "$http", function($scope, $http) {
  $scope.items = [{
    id: 1,
    breed: 'Cats',
    value: 'cat'
  }, {
    id: 2,
    breed: 'Dogs',
    value: 'dog'
  }, {
    id: 3,
    breed: 'Small Furry',
    value: 'smallfurry'
  }];

  var key = 'b900e0d5e332753a460a64eaa8de00fd';
  var baseURL = 'http://api.petfinder.com/';



  function addToFavorite() {
    console.log($scope.animal);
    // var animalImage = $scope.animal.media.photos.photo[2].$t;
    var favoriteAnimal = {
      id: $scope.animal.id.$t,
      name: $scope.animal.name.$t,
      // image: animalImage,
      description: $scope.animal.description.$t
    };
    // console.log('animal image',  animalImage);
    console.log(favoriteAnimal);
    $http.post('/favorite', favoriteAnimal)
    .then(function(response) {
        console.log("post response: ", response);
        if(response.status == 201) {
          // $scope.response.data;
          console.log('its a success!');

        } else {
          console.log("error posting new task");
        }
      });
  }

  function getAnimal(animal) {
    console.log(animal);
    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + animal.value;
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      console.log(response);
      $scope.animal = response.data.petfinder.pet;
      console.log('selected animal', $scope.animal);
    });
  }
  $scope.addToFavorite = addToFavorite;
  $scope.getAnimal = getAnimal;

}]);


// myApp.controller("favoriteController", ["$scope", "$http", function($scope, $http) {
//   var pets = [];
//   var pet = {};
//   $scope.petdata = function() {
//     $scope.pets.push({
//       petId: $scope.pet.id,
//       name: $scope.pet.name,
//       image: $scope.pet.image,
//       description: $scope.pet.description
//     });
//     console.log('pet data', pet.name, pet.image, pet.description);
//   }
// }]);



// function favorite() {

//     http.post('/favorite', data).then(function(response) {

//     });
// }