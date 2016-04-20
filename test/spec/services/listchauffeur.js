'use strict';

describe('Service: listChauffeur', function () {

  // load the service's module
  beforeEach(module('dmscartoAngularGruntApp'));

  // instantiate service
  var listChauffeur;
  beforeEach(inject(function (_listChauffeur_) {
    listChauffeur = _listChauffeur_;
  }));

  it('should do something', function () {
    expect(!!listChauffeur).toBe(true);
  });

});
