/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
    selector: 'client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
    clients: Client[];
    totalOwed: number;
    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.clientService.getClients().subscribe(clients => {
            this.clients = clients;
            this.getTotalOwed();
            // for debugging
            // if (this.clients.length > 0) {
            //     alert('working');
            // }
        });
    }

    getTotalOwed() {
        this.totalOwed = this.clients.reduce((total, client) => {
            return total + parseFloat(client.balance.toString());
        }, 0)
    }
}
