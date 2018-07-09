/* tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../../models/employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
    employee: Employee = {
        id: "",
        first_name: "",
        last_name: "",
        office: "",
        salary: 0
    };

    @ViewChild('employeeForm') form: any;

    constructor(private flashMessage: FlashMessagesService,
                private employeeService: EmployeeService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit({value, valid}: { value: Employee, valid: boolean }) {
        if (!valid) {
            /**----- show message -----**/
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger', timeout: 3000
            });
        } else {
            this.employeeService.newEmployee(value);

            /**----- show message -----**/
            this.flashMessage.show('new employee added', {
                cssClass: 'alert-success', timeout: 3000
            });

            this.router.navigate(['/employee'])
        }

        this.form.reset();
    }
}
