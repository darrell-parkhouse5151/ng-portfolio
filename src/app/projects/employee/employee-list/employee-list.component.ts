/* tslint:disable*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    employees: Employee[];
    totalSalary: number = 0;

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        document.body.classList.add('employee');

        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees;
            this.getTotalSalaries();
        })
    }

    getTotalSalaries() {
        this.totalSalary = this.employees.reduce((total, employee) => {
            return total + parseFloat(employee.salary.toString());
        }, 0);
    }

    ngOnDestroy() {
        document.body.classList.remove('employee');
    }


}
