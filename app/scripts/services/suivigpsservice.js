'use strict';

/**
 * @ngdoc service
 * @name dmscartoAngularGruntApp.suivigpsService
 * @description
 * # suivigpsService
 * Service in the dmscartoAngularGruntApp.
 */
angular.module('dmscartoAngularGruntApp')
  .service('suivigpsService',['$http', function($http) {
    var url ='http://localhost/dmscarto_angular_grunt/app/api/api.php/dmsgps'
    var gpsChauffeur = {};
    this.loadgpsChauffeur = function (chauffeur) {
        console.log(chauffeur.substring(0,4));
        return $http.get(url+'/?filter=DGPCOND,cs,'+chauffeur.substring(0,4)+'&transform=1');


    };
  }]);
