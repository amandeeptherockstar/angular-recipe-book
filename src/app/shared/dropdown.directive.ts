import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input('appDropdown') el: HTMLDivElement;
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onclick() {
    // console.log(this.el);
    this.isOpen = !this.isOpen;
    if (this.el) {
      if (this.isOpen) {
        this.el.classList.add('show');
        this.isOpen = true;
      } else {
        this.el.classList.remove('show');
        this.isOpen = false;
      }
    }
    // (this.el as HTMLElement).classList.add('open');
    // console.log(this.el);
  }

  // @HostListener('document:click', ['$event']) clickedOutside($event) {
  //   console.log(this.isOpen, 'isOpen');
  //   console.log(this.el);
  //   if (this.isOpen && ($event.target.classList as DOMTokenList).contains('navbar-collapse')) { {
  //       // check if the this.isOpen is true, if so revert the class
  //       this.el.classList.remove('show');
  //       this.isOpen = false;
  //     }
  //   //    else if (
  //   //     !($event.target.classList as DOMTokenList).contains('dropdown-toggle')
  //   //   ) {
  //   //     // console.log('show class removed');
  //   //     this.el.classList.remove('show');
  //   //     // this.isOpen = false;
  //   //   }
  //   // } else {
  //   //   console.log('me');
  //   // }
  // }
}
