/* tslint:disable*/
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[toggle-selected-filter]'
})
export class ToggleSelectedFilterDirective {
    constructor(private elem: ElementRef) {}

    @HostListener('click', ['$event'])
    onToggle($event: any) {
        $event.preventDefault();

        this.elem.nativeElement.classList.toggle('filter-is-selected');
        this.elem.nativeElement.classList.toggle('filter-not-selected');
    }
}
