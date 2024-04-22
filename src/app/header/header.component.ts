import { Component, OnDestroy, OnInit } from '@angular/core';
import {animateMobileTrigger, listStateTrigger} from "./animations";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable, Subscription} from "rxjs";
import { SettingsService } from '../settings/services/settings.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    animateMobileTrigger,
    listStateTrigger
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  isNavMenu = false;
  isAccountMenu = false;
  settings: any
  settingsSubscription: Subscription;
  showSpinner = false;
  isSettings: boolean = false;
  user: any;

     
     constructor(private breakpointObserver: BreakpointObserver, private settingsService: SettingsService, public authService: AuthService) {
    
     this.breakpointObserver.observe('(min-width: 960px)').subscribe(result => {
       if (this.isNavMenu) {
         this.isNavMenu = false
       }
     })

     this.authService.user$.subscribe(user => {
      this.user = user;
     })

     this.settingsSubscription = this.settingsService.getSettingsCollection().subscribe(settings => {
      this.showSpinner = true;
        if (settings.length > 0) {
          this.settings = settings[0];
          this.isSettings = true;    
        } else {
          this.isSettings = false;
          console.log('There is no setting document');
        }
        this.showSpinner = false;
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
  ngOnDestroy(): void {
    
  }
}
