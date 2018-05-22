/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
    id: string;
    client: Client;
    hasBalance: boolean = false;
    showBalanceUpdateInput: boolean = false;

    constructor(private clientService: ClientService,
                private router: Router,
                private route: ActivatedRoute,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.clientService.getClient(this.id).subscribe(client => {
            if (client !== null) {
                if (client.balance > 0) {
                    this.hasBalance = true;
                }
            }

            this.client = client;
        });
    }

    updateBalance() {
        this.clientService.updateClient(this.client);

        this.flashMessage.show('Balance updated', {
            cssClass: 'alert-success', timeout: 3000
        });
    }

    onDelete() {
        if (confirm('Are you sure?')) {
            this.clientService.deleteClient(this.client);

            /**----- show message -----**/
            this.flashMessage.show('Client successfully removed', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/client-dashboard'])
        }
    }

}
