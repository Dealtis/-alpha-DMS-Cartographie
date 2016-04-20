'use strict';

describe('Service: suivilivService', function () {

  // load the service's module
  beforeEach(module('dmscartoAngularGruntApp'));

  // instantiate service
  var suivilivService;
  beforeEach(inject(function (_suivilivService_) {
    suivilivService = _suivilivService_;
  }));

  it('should do something', function () {
    expect(!!suivilivService).toBe(true);
  });

});
