/* tslint:disable*/
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'compose-email',
    templateUrl: './compose-email.component.html',
    styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit {
    pageName: string = 'Compose Email';
    componentName: string = 'Compose New Email';
    constructor() {
    }

    ngOnInit() {
        document.body.classList.add('quantum');
    }

}
