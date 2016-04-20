'use strict';

/**
 * @ngdoc service
 * @name dmscartoAngularGruntApp.suivilivService
 * @description
 * # suivilivService
 * Factory in the dmscartoAngularGruntApp.
 */
angular.module('dmscartoAngularGruntApp')
  .service('suivilivService',['$http', function($http) {
    var url ='http://localhost/dmscarto_angular_grunt/app/api/api.php/dmssuiviliv'
    var livraisonsChauffeur = {};
    this.loadlivraisonsChauffeur = function (chauffeur) {
        return $http.get(url+'/?filter=DMSCODECHAUFFEUR,eq,'+chauffeur+'&transform=1');
    };
  }]);
