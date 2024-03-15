import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive ({
  selector: '[qssDropdown]'
})

export class DropdownDirective {

  private toggleClose = true;

  @HostBinding('class.closed') get onClosed() {
    return this.toggleClose;
  }

  @HostListener('mouseleave') close() {
    this.toggleClose = true;
  }

  @HostListener('click') onMouseClick() {
    this.toggleClose = false;
  }
}






