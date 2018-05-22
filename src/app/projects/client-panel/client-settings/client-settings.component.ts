/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';
import { ClientSettingsService } from '../../../services/client-settings.service';
import { ClientSettings } from '../../../models/client-settings';

@Component({
    selector: 'client-settings',
    templateUrl: './client-settings.component.html',
    styleUrls: ['./client-settings.component.scss']
})
export class ClientSettingsComponent implements OnInit {
    settings: ClientSettings;

    constructor(private authService: AuthService,
                private router: Router,
                private settingsService: ClientSettingsService,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();
    }

    onSubmit() {
        this.settingsService.changeSettings(this.settings);

        /**----- show message -----**/
        this.flashMessage.show('Settings saved', {
            cssClass: 'alert-success', timeout: 3000
        });
    }

}
