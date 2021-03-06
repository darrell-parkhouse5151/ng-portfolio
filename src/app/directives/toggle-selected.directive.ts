/* tslint:disable*/
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[toggle-selected]'
})
export class ToggleSelectedDirective {

  constructor(private elem: ElementRef) { }

  @HostListener('click', ['$event'])
  onToggle($event: any) {
      $event.preventDefault();

      this.elem.nativeElement.classList.toggle('checkbox-single-is-selected');
      this.elem.nativeElement.classList.toggle('checkbox-single-not-selected');
  }

}
