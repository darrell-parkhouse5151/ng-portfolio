/* tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { ClientSettingsService } from '../../../services/client-settings.service';

@Component({
    selector: 'app-client-add',
    templateUrl: './client-add.component.html',
    styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {
    client: Client = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        balance: 0
    };

    disableBalanceOnAdd: boolean = false;

    @ViewChild('clientForm') form: any;

    constructor(private flashMessage: FlashMessagesService,
                private clientService: ClientService,
                private router: Router,
                private clientSettingsService: ClientSettingsService) {
    }

    ngOnInit() {
        this.disableBalanceOnAdd = this.clientSettingsService.getSettings().disableBalanceOnAdd;
    }

    onSubmit({value, valid}: {value: Client, valid: boolean}) {
        if (this.disableBalanceOnAdd) {
            value.balance = 0;
        }

        if (!valid) {
            // show error
            this.flashMessage.show('Please fill out form correctly', {
                cssClass: 'alert-danger', timeout: 3000
            });
        } else {
            this.clientService.newClient(value);

            this.flashMessage.show('New client added', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/client-dashboard']);
        }
    }
}
