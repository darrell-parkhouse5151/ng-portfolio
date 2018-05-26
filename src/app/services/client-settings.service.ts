/* tslint:disable*/
import { Injectable } from '@angular/core';
import { ClientSettings } from '../models/client-settings';

@Injectable({
    providedIn: 'root'
})
export class ClientSettingsService {
    settings: ClientSettings = {
        allowRegistration: false,
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: true
    };

    constructor() {
        if (localStorage.getItem('settings') !== null) {
            this.settings = JSON.parse(localStorage.get('settings'));
        }
    }

    getSettings() : ClientSettings {
        return this.settings;
    }

    changeSettings(settings: ClientSettings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

}
