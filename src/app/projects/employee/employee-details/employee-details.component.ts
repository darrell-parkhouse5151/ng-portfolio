/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoggingService } from '../../../services/logging.service';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
    id: string;
    employee: Employee;

    constructor(private employeeService: EmployeeService,
                private router: Router,
                private route: ActivatedRoute,
                private flashMessage: FlashMessagesService,
                private loggserService: LoggingService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.employeeService.getEmployee(this.id)
            .subscribe(employee => this.employee = employee);
    }

    onDelete() {
        if (confirm('Are you sure?')) {
            this.employeeService.deleteEmployee(this.employee);

            /**----- show message -----**/
            this.flashMessage.show('Employee successfully removed', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/employee-list'])
                .then(() => this.loggserService.logMessage('success'))
                .catch(error => this.loggserService.logMessage(error));
        }
    }
}
