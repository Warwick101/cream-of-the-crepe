import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {svgList} from './Constants';
import {isPlatformServer} from '@angular/common';
import {MatIconRegistry} from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class RegisterIconsService {
  private svgList: any;

  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: string) {
    this.svgList = svgList;
    const domain = (isPlatformServer(platformId)) ? 'http://localhost:4200/' : '';
    svgList.map((svg) => {
      iconRegistry.addSvgIcon(svg, this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icons/' + svg + '.svg'));
    });
  }
}
