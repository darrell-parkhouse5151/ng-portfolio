/* tslint:disable*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { ClientAddComponent } from './projects/client-panel/client-add/client-add.component';
import { ClientDashboardComponent } from './projects/client-panel/client-dashboard/client-dashboard.component';
import { ClientDetailsComponent } from './projects/client-panel/client-details/client-details.component';
import { ClientEditComponent } from './projects/client-panel/client-edit/client-edit.component';
import { ClientListComponent } from './projects/client-panel/client-list/client-list.component';
import { ClientLoginComponent } from './projects/client-panel/client-login/client-login.component';
import { ClientRegisterComponent } from './projects/client-panel/client-register/client-register.component';
import { ClientSettingsComponent } from './projects/client-panel/client-settings/client-settings.component';
import { ClientSidebarComponent } from './projects/client-panel/client-sidebar/client-sidebar.component';
import { NavbarComponent } from './projects/client-panel/navbar/navbar.component';

import { EpicArticlesComponent } from './projects/epic/epic-articles/epic-articles.component';
import { EpicEcommerceComponent } from './projects/epic/epic-ecommerce/epic-ecommerce.component';

import { QuantumEmailComponent } from './projects/quantum/quantum-email/quantum-email.component';
import { QuantumLeadsComponent } from './projects/quantum/quantum-leads/quantum-leads.component';

import { PortfolioItemsComponent } from './portfolio-items/portfolio-items.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { ToggleSelectedLeadDirective } from './directives/toggle-selected-lead.directive';
import { ToggleSelectedDirective } from './directives/toggle-selected.directive';
import { ToggleStarDirective } from './directives/toggle-star.directive';
import { EmailSidebarComponent } from './projects/quantum/email-sidebar/email-sidebar.component';
import { ComposeEmailComponent } from './projects/quantum/quantum-email/compose-email/compose-email.component';
import { NewEmailFormComponent } from './projects/quantum/quantum-email/new-email-form/new-email-form.component';

const appRoutes: Routes = [
	{
		path: '',
		component: QuantumEmailComponent
	},
	{
		path: 'client-dashboard',
		component: ClientDashboardComponent
	},
	{
		path: 'client-register',
		component: ClientRegisterComponent
	},
	{
		path: 'client-login',
		component: ClientLoginComponent
	},
	{
		path: 'client-settings',
		component: ClientSettingsComponent
	},
	{
		path: 'client/:id',
		component: ClientDetailsComponent
	},
	{
		path: 'client-add',
		component: ClientAddComponent
	},
	{
		path: 'client/edit/:id',
		component: ClientEditComponent
	},
	{
		path: 'epic-articles',
		component: EpicArticlesComponent
	},
	{
		path: 'epic-ecommerce',
		component: EpicEcommerceComponent
	},
	{
		path: 'quantum-leads',
		component: QuantumLeadsComponent
	},
	{
		path: 'quantum-email',
		component: QuantumEmailComponent
	},
    {
        path: 'new-email',
        component: ComposeEmailComponent
    }
];

@NgModule({
	declarations: [
		AppComponent,
		ClientAddComponent,
		ClientDetailsComponent,
		ClientDashboardComponent,
		ClientEditComponent,
		ClientLoginComponent,
		ClientListComponent,
		ClientRegisterComponent,
		ClientSettingsComponent,
		ClientSidebarComponent,
		NavbarComponent,
		PortfolioItemsComponent,
		EpicEcommerceComponent,
		EpicArticlesComponent,
		QuantumLeadsComponent,
		QuantumEmailComponent,
		ToggleSelectedLeadDirective,
		ToggleSelectedDirective,
		ToggleStarDirective,
		EmailSidebarComponent,
        ComposeEmailComponent,
        NewEmailFormComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		FlashMessagesModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig, 'ng-quantum-ui-kit'),
		AngularFirestoreModule,
		AngularFireAuthModule,
		FormsModule
	],
	providers: [  ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
