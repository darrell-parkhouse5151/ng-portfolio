/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
    selector: 'app-client-login',
    templateUrl: './client-login.component.html',
    styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private authService: AuthService,
                private router: Router,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
        this.authService.getAuth().subscribe(auth => {
            if (auth) {
                this.router.navigate(['/client-dashboard']);
            }
        });
    }

    onSubmit() {
        this.authService.login(this.email, this.password)
            .then(res => {
                /**----- show message -----**/
                this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success', timeout: 3000
                });
                this.router.navigate(['/client-dashboard']);
            }).catch(err => {
            /**----- show message -----**/
            this.flashMessage.show(err.message, {
                cssClass: 'alert-danger', timeout: 3000
            })
        })
    }
}
