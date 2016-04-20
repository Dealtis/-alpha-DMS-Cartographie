'use strict';

describe('Service: suivigpsService', function () {

  // load the service's module
  beforeEach(module('dmscartoAngularGruntApp'));

  // instantiate service
  var suivigpsService;
  beforeEach(inject(function (_suivigpsService_) {
    suivigpsService = _suivigpsService_;
  }));

  it('should do something', function () {
    expect(!!suivigpsService).toBe(true);
  });

});
