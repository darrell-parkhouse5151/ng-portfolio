/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientSettingsService } from '../../../services/client-settings.service';

@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
    id: string;

    client: Client = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        balance: 0
    };

    disableBalanceOnEdit: boolean = true;

    constructor(private clientService: ClientService,
                private router: Router,
                private route: ActivatedRoute,
                private flashMessage: FlashMessagesService,
                private clientSettings: ClientSettingsService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.clientService.getClient(this.id).subscribe(client => this.client = client);
        this.disableBalanceOnEdit = this.clientSettings.getSettings().disableBalanceOnEdit;
    }

    onSubmit({value, valid}: {value: Client, valid: boolean}) {
        if (!valid) {
            this.flashMessage.show('Please fill in all the form correctly', {
                cssClass: 'alert-danger', timeout: 3000
            });
        } else {
            value.id = this.id;

            this.clientService.updateClient(value);

            this.flashMessage.show('client updated', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/client/' + this.id])
        }
    }

}
