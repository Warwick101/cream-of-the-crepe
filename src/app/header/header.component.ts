import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNavMenu = false;
  isAccountMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  menuOn() {
    this.isNavMenu = !this.isNavMenu;
  }

  menuOff() {
    this.isNavMenu = false;
  }

  toggleAccountMenu() {
    this.isAccountMenu = !this.isAccountMenu;
  }
}
