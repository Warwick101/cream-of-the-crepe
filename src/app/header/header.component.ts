import { Component, OnInit } from '@angular/core';
import {animateMobileTrigger, listStateTrigger} from "./animations";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    animateMobileTrigger,
    listStateTrigger
  ]
})
export class HeaderComponent implements OnInit {

  isNavMenu = false;
  isAccountMenu = false;

  constructor(private breakpointObserver: BreakpointObserver) {
     this.breakpointObserver.observe('(min-width: 960px)').subscribe(result => {
       if (this.isNavMenu) {
         this.isNavMenu = false
       }
     })
  }

  ngOnInit(): void {
  }

  menuOn() {
    this.isNavMenu = !this.isNavMenu;
  }

  menuOff() {
    this.isNavMenu = false;
  }
}
