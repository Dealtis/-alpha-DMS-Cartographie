'use strict';

/**
 * @ngdoc function
 * @name dmscartoAngularGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dmscartoAngularGruntApp
 */
angular.module('dmscartoAngularGruntApp')
  .controller('MainCtrl', ['$scope', '$http', 'listChauffeur', 'suivilivService', 'suivigpsService', 'uiGmapGoogleMapApi', function($scope, $http, listChauffeur, suivilivService, suivigpsService, uiGmapGoogleMapApi) {

    $scope.home = {
      coords: {
        latitude: 45.76859051,
        longitude: 5.02058929
      },
      markerHome: {
        id: Date.now(),
        coords: {
          latitude: 45.76859051,
          longitude: 5.02058929
        },
        options: {
          icon: {
            url: '../../images/ICO/ico_home.svg'
          },
          // labelClass: 'labels',
          // labelAnchor: '5 35',
          // labelContent: 'RODIS',
        }
      }
    };
    $scope.center;

    $scope.map = {
      center: $scope.home.coords,
      zoom: 10,
      home: $scope.home,
    };



    //CLean map
    $scope.cleanMap = function() {
      console.log("Clean map call");
    $scope.map = {
        center: $scope.home.coords,
        zoom: 10,
        home: $scope.home
      };
      $scope.TrajetPath = [];
      $scope.polylines = [{
        id: 1,
        path: $scope.TrajetPath,
        stroke: {
          color: '#6060FB',
          weight: 2.5
        },
        editable: false,
        draggable: false,
        geodesic: false,
        visible: true,
        icons: [{
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
          },
          offset: '25px',
          repeat: '200px'
        }]
      }];
    };
    //Liste des chauffeurs
    $scope.chauffeurs = listChauffeur.loadChauffeurs()
      .then(function(response) {
        $scope.chauffeurs = response.data.dmssuiviliv;
      });

    //Liste des livraison du chauffeur
    $scope.getLivraisonsChauffeur = function(chauffeur, value) {
      if (value) {
        $scope.markers = [];
        suivilivService.loadlivraisonsChauffeur(chauffeur)
          .then(function(response) {
            var center;
            $scope.boundsMarkers = new google.maps.LatLngBounds();
            angular.forEach(response.data.dmssuiviliv, function(marker) {
              var gpst = marker.DMSPOSGPS.replace(",", ".").replace(",", ".");
              var markersplit = gpst.split(";");
              var addmarker = {
                id: Date.now(),
                coords: {
                  latitude: markersplit[0],
                  longitude: markersplit[1]
                },
                options: {
                  icon: {
                    //url:'../../images/ICO/ico_liv_v.svg',
                    url: getImg(marker.DMSUIVICODEANO),
                    size: new google.maps.Size(50, 75),
                  },
                  animation: google.maps.Animation.DROP,
                  labelClass: 'labels',
                  labelAnchor: '5 35',
                  labelContent: '<p>1</p>',
                },
                infowindows: marker.DMSUIVIOTSNUM
              };

              $scope.center = {
                latitude: markersplit[0],
                longitude: markersplit[1]
              };

              //bounds
              var itemBound = new google.maps.LatLng(markersplit[0], markersplit[1]);
              $scope.boundsMarkers.extend(itemBound);
              $scope.markers.push(addmarker);
            });

            $scope.map = {
              center: $scope.center,
              home: $scope.home,
              markers: $scope.markers,
              bounds: {
                northeast: {
                  latitude: $scope.boundsMarkers.R.j,
                  longitude: $scope.boundsMarkers.j.R,
                },
                southwest: {
                  latitude: $scope.boundsMarkers.R.R,
                  longitude: $scope.boundsMarkers.j.j,
                }
              }
            };
          });
      } else {
        $scope.map = {
          //HOME
          center: $scope.home.coords,
          home: $scope.home
        };
      }

      function getImg(codeAno) {
        switch (codeAno) {
          case "LIVCFM":
            return '../../images/ICO/ico_liv_v.svg';
            break;
          case "RAMCFM":
            return '../../images/ICO/ico_ram_v.svg';
            break;
          default:
            return '../../images/ICO/ico_liv_a.svg';
        }
      }
    };

    //Trajet chauffeur

    $scope.getTrajetChauffeur = function(chauffeur, value) {
      if (value) {
        $scope.TrajetPath = [];
        suivigpsService.loadgpsChauffeur(chauffeur)
          .then(function(response) {
            angular.forEach(response.data.dmsgps, function(datagps) {
              var gpsSplit = datagps.DGPPOSITION.split("|");
              var posgpsSplit = [];
              for (var i = 0; i < gpsSplit.length; i++) {
                posgpsSplit.push(gpsSplit[i].replace(",", ".").replace(",", "."));
              }
              angular.forEach(posgpsSplit, function(gps) {
                var gpsSplitSplit = gps.split(";");
                var addmarker = {
                  latitude: gpsSplitSplit[0],
                  longitude: gpsSplitSplit[1]
                }
                $scope.TrajetPath.push(addmarker);
              })
            });
            $scope.polylines = [{
              id: 1,
              path: $scope.TrajetPath,
              stroke: {
                color: '#6060FB',
                weight: 2.5
              },
              editable: false,
              draggable: false,
              geodesic: false,
              visible: true,
              icons: [{
                icon: {
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
                },
                offset: '25px',
                repeat: '200px'
              }]
            }];
          });
      } else {
        $scope.TrajetPath = [];
        $scope.polylines = [{
          id: 1,
          path: $scope.TrajetPath,
          stroke: {
            color: '#6060FB',
            weight: 2.5
          },
          editable: false,
          draggable: false,
          geodesic: false,
          visible: true,
          icons: [{
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
            },
            offset: '25px',
            repeat: '200px'
          }]
        }];
      }
    }
  }]);
