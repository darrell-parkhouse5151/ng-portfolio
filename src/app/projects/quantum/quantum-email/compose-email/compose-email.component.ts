/* tslint:disable*/
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'compose-email',
    templateUrl: './compose-email.component.html',
    styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit, OnDestroy {
    pageName: string = 'Compose Email';
    componentName: string = 'Compose New Email';
    constructor() {
    }

    ngOnInit() {
        document.body.classList.add('quantum');
    }

    ngOnDestroy() {
        document.body.classList.remove('quantum');
    }
}
