/* tslint:disable*/
import { Injectable } from '@angular/core';
import { Lead } from '../models/lead';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root'
})
export class LeadsService {
    leadCollection: AngularFirestoreCollection<Lead>;
    leadDoc: AngularFirestoreDocument<Lead>;
    leads: Observable<Lead[]>;
    lead: Observable<Lead>;

    constructor(private angularFirestore: AngularFirestore,
                private loggingService: LoggingService) {
        this.angularFirestore.firestore.settings({timestampsInSnapshots: true});
        this.leadCollection = this.angularFirestore.collection('leads', ref => ref.orderBy('leadTitle', 'asc'));
    }

    getLeads(): Observable<Lead[]> {
        this.leads = this.leadCollection.snapshotChanges().map(change => {
            return change.map(action => {
                const data = action.payload.doc.data() as Lead;
                data.id = action.payload.doc.id;
                return data;
            });
        });

        return this.leads;
    }

    getLead(id: string): Observable<Lead> {
        this.leadDoc = this.angularFirestore.doc<Lead>(`leads/${id}`);

        this.lead = this.leadDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Lead;
                data.id = action.payload.id;

                return data;
            }
        });

        return this.lead;
    }

    newLead(lead: Lead) {
        this.leadCollection.add(lead)
            .then(() => this.loggingService.logMessage('successfully added lead'))
            .catch((err) => this.loggingService.logMessage(err));
    }

    updateLead(lead: Lead) {
        this.leadDoc = this.angularFirestore.doc(`leads/${lead.id}`);
        this.leadDoc.update(lead)
            .then(() => this.loggingService.logMessage('successfully updated lead'))
            .catch((err) => this.loggingService.logMessage(err));
    }

    deleteLead(lead: Lead) {
        this.leadDoc = this.angularFirestore.doc(`leads/${lead.id}`);
        this.leadDoc.delete()
            .then(() => this.loggingService.logMessage('successfully removed lead'))
            .catch((err) => this.loggingService.logMessage(err));
    }
}
