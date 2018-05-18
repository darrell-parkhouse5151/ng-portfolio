/* tslint:disable*/
import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[toggle-selected-lead]'
})

export class ToggleSelectedLeadDirective {
    constructor(private elem: ElementRef) {}

    @HostListener('click', ['$event'])
    onToggle($event: any) {
        $event.preventDefault();

        this.elem.nativeElement.classList.toggle('single-lead-is-selected')
        this.elem.nativeElement.classList.toggle('single-lead-not-selected')
    }
}
