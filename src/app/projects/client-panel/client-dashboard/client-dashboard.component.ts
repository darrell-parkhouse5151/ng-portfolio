/* tslint:disable*/
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
      document.body.classList.add('client-panel');
  }

  ngOnDestroy() {
      document.body.classList.remove('client-panel');
  }


}
