/* tslint:disable*/
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[toggle-star]'
})
export class ToggleStarDirective {

    constructor(private elem: ElementRef) {
    }

    @HostListener('click', ['$event'])
    onToggle($event: any) {
        $event.preventDefault();

        this.elem.nativeElement.classList.toggle('star-is-selected');
        this.elem.nativeElement.classList.toggle('star-not-selected');
    }
}
