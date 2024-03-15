import {TestBed} from '@angular/core/testing';

import {RegisterIconsService} from './register-icons.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {svgList} from './Constants';

describe('RegisterIconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: RegisterIconsService = TestBed.get(RegisterIconsService);
    expect(service).toBeTruthy();
  });

  xit('should call register for each resource defined in the constants file', () => {
    const service = TestBed.get(RegisterIconsService);

    const addSpy = spyOn(service['iconRegistry'], 'addSvgIcon');
    const domSpy = spyOn(service['domSanitizer'], 'bypassSecurityTrustResourceUrl').and.returnValue('someSvg');
    const addSpyArgList = svgList.map( (svg) => [svg, 'someSvg']);
    const domSpyArgList = svgList.map( (svg) => ['assets/svg/' + svg + '.svg']);

    service.constructor(service['iconRegistry'], service['domSanitizer']);

    expect(addSpy.calls.allArgs()).toEqual(addSpyArgList);
    expect(domSpy.calls.allArgs()).toEqual(domSpyArgList);
  });
});
