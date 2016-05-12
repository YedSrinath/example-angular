var app = angular.module('app', ['todos', 'temperature', 'ngRoute']);


app.config(function($routeProvider) {
  $routeProvider
  .when('/', {

  })
  .when('/todos', {
    template: '<todos></todos>'
  })
  .when('/temp', {
    template: '<temp></temp>'
  })
  .otherwise({
    redirectTo: '/todos'
  });
});
