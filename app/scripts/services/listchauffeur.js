'use strict';

/**
 * @ngdoc service
 * @name dmscartoAngularGruntApp.listChauffeur
 * @description
 * # listChauffeur
 * service in the dmscartoAngularGruntApp.
 */
angular.module('dmscartoAngularGruntApp')
  .service('listChauffeur', ['$http', function($http) {

    var url ='http://localhost/dmscarto_angular_grunt/app/api/api.php/dmssuiviliv?transform=1'
    var listChauffeur= {};
    this.loadChauffeurs = function () {
        return $http.get(url);
    };
  }]);
