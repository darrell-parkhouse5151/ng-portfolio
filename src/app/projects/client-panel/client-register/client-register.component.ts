/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './client-register.component.html',
    styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
    email: string;
    password: string;

    constructor(private authService: AuthService,
                private router: Router,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.authService.register(this.email, this.password)
            .then(res => {
                /*+----- show message -----**/
                this.flashMessage.show('You are now registered', {
                    cssClass: 'alert-success', timeout: 4000
                });

                this.router.navigate(['/dashboard']);
            }).catch(err => {
            /*+----- show message -----**/
            this.flashMessage.show(err.message, {
                cssClass: 'alert-danger', timeout: 4000
            });
        });
    }
}
