import { Component } from '@angular/core';
import { MenuManagerService } from '../services/menu-manager.service';


@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.scss'
})
export class MenuManagerComponent {

  constructor(private menuManagerService: MenuManagerService){

  }

  addSubMenu(){
    const subMenuData = {
      title: 'this is a test'
    }

    this.menuManagerService.addSubMenuData(subMenuData)
  }

}
