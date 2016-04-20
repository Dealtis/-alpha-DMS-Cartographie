'use strict';

/**
 * @ngdoc overview
 * @name dmscartoAngularGruntApp
 * @description
 * # dmscartoAngularGruntApp
 *
 * Main module of the application.
 */
angular
  .module('dmscartoAngularGruntApp', [
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'angular.filter',
    'uiGmapgoogle-maps'
  ]).filter('split', function() {
    return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
    }
  })
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      libraries: 'geometry,visualization'
    });
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
