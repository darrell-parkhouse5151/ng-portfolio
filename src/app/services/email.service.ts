/* tslint:disable*/
import { Injectable } from '@angular/core';
import { Email } from '../models/email';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    emailCollection: AngularFirestoreCollection<Email>;
    emailDoc: AngularFirestoreDocument<Email>;
    emails: Observable<Email[]>;
    email: Observable<Email>;

    constructor(private angularFirestore: AngularFirestore,
                private loggingService: LoggingService) {
        this.angularFirestore.firestore.settings({timestampsInSnapshots: true});
        this.emailCollection = this.angularFirestore.collection('emails', ref => ref.orderBy('from', 'asc'));
    }

    getEmails(): Observable<Email[]> {
        this.emails = this.emailCollection.snapshotChanges().map(change => {
            return change.map(action => {
                const data = action.payload.doc.data() as Email;
                data.id = action.payload.doc.id;
                return data;
            });
        });

        return this.emails;
    }

    getEmail(id: string): Observable<Email> {
        this.emailDoc = this.angularFirestore.doc<Email>(`emails/${id}`);

        this.email = this.emailDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Email;
                data.id = action.payload.id;

                return data;
            }
        });

        return this.email;
    }

    deleteEmail(email: Email) {
        this.emailDoc = this.angularFirestore.doc(`emails/${email.id}`);

        this.emailDoc.delete()
            .then(() => this.loggingService.logMessage('Successfully remove email'))
            .catch((err) => this.loggingService.logMessage(err));
    }
}
