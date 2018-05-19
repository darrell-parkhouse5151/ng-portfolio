/* tslint:disable*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
    public logMessage(message: string) {
        console.log('[LoggingService.logMessage()]', message);
    }
}
