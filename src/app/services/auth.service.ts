/* tslint:disable*/
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/map";
@Injectable()
export class AuthService {

    constructor(private angularAuth: AngularFireAuth) {
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.angularAuth.auth.signInWithEmailAndPassword(email, password)
                .then(userData => resolve(userData), err => reject(err));
        });
    }

    getAuth() {
        return this.angularAuth.authState.map(auth => auth);
    }

    logout() {
        this.angularAuth.auth.signOut()
            .then(() => console.log('success'))
            .catch(err => console.log(err));
    }

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.angularAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userData => resolve(userData), err => reject(err));
        });
    }
}
