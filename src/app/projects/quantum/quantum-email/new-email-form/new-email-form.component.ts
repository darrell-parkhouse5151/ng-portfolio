/* tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewEmail } from '../../../../models/new-email';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NewEmailService } from '../../../../services/new-email.service';
import { Router } from '@angular/router';

@Component({
    selector: 'new-email-form',
    templateUrl: './new-email-form.component.html',
    styleUrls: ['./new-email-form.component.scss']
})
export class NewEmailFormComponent implements OnInit {
    newEmail: NewEmail = {
        id: '',
        to: '',
        body: '',
        hasAttachment: false
    };

    @ViewChild('newEmailForm') form: any;

    constructor(private flashMessage: FlashMessagesService,
                private newEmailService: NewEmailService,
                private router: Router) {
    }

    ngOnInit() {

    }

    onSubmit({value, valid}: {value: NewEmail, valid: boolean}) {
        if (!valid) {
            /**----- show error -----**/
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger', timeout: 3000
            });
        } else {
            this.newEmailService.newEmail(value);

            /**----- show message -----**/
            this.flashMessage.show('New email added', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/quantum-email']);
        }
    }
}
