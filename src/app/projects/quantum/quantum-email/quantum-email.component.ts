/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Email } from '../../../models/email';
import { EmailService } from '../../../services/email.service';

@Component({
	selector: 'app-quantum-email',
	templateUrl: './quantum-email.component.html',
	styleUrls: [ './quantum-email.component.scss' ]
})
export class QuantumEmailComponent implements OnInit {
	pageName: string = 'Email Client';
	componentName: string = 'Mailbox CRM';
	emails: Email[];
	email: Email;

	public isCheckboxSelected: boolean = false;
	public isStarSelected: boolean = false;
	public isSingleCheckboxSelected: boolean = false;

	public id: any;

	spam = [];
	archive = [];
	trash = []; // i may not use this

	constructor(private emailService: EmailService) {}

	ngOnInit() {
		document.body.classList.add('quantum');

		this.emailService.getEmails().subscribe((emails) => {
			// console.log(emails);
			this.emails = emails;
		});
	}

	toggleAll() {
		this.isSingleCheckboxSelected = !this.isSingleCheckboxSelected;
		this.isCheckboxSelected = !this.isCheckboxSelected;
	}

	toggleStarSelected(target) {}

	toggleSingleCheckboxClass(event: Event) {}

	sendToArchive() {
		this.archive.push();
	}

	sendToTrash() {
		this.trash.push();
	}

	emptyTrash() {
		let trashCount = this.trash.length + 1;
		this.trash = [];
	}

	emptySpamFolder() {
		let spamCount = this.spam.length + 1;
		this.spam = [];
	}

	onDelete() {
		if (this.isCheckboxSelected === true) {
			this.emailService.deleteEmail(this.email);
		}
	}
}
