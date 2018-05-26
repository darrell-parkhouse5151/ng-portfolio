/* tslint:disable*/
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

import {Client} from '../models/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    clientCollection: AngularFirestoreCollection<Client>;
    clientDoc: AngularFirestoreDocument<Client>;
    clients: Observable<Client[]>;
    client: Observable<Client>;

    constructor(private angularFirestore: AngularFirestore) {
        this.angularFirestore.firestore.settings({ timestampsInSnapshots: true });
        this.clientCollection = this.angularFirestore.collection('clients', ref => ref.orderBy('lastName', 'asc'));
    }

    getClients() : Observable<Client[]> {
        this.clients = this.clientCollection.snapshotChanges().map(change => {
            return change.map(action => {
                const data = action.payload.doc.data() as Client;
                data.id = action.payload.doc.id;
                return data;
            });
        });

        return this.clients;
    }

    newClient(client: Client) {
        this.clientCollection.add(client)
            .then(() => console.log('success'))
            .catch(err => console.log(err));
    }

    getClient(id: string) : Observable<Client> {
        this.clientDoc = this.angularFirestore.doc<Client>(`clients/${id}`);

        this.client = this.clientDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Client;
                data.id = action.payload.id;
                return data;
            }
        });

        return this.client;
    }

    updateClient(client: Client) {
        this.clientDoc = this.angularFirestore.doc(`clients/${client.id}`);
        this.clientDoc.update(client)
            .then(() => console.log('successfully updated client'))
            .catch(err => console.log(err));
    }

    deleteClient(client: Client) {
        this.clientDoc = this.angularFirestore.doc(`clients/${client.id}`);
        this.clientDoc.delete()
            .then(() => console.log('successfully removed client'))
            .catch(err => console.log(err));
    }
}
