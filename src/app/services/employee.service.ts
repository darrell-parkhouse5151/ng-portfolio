/* tslint:disable*/
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    employeeCollection: AngularFirestoreCollection<Employee>;
    employeeDoc: AngularFirestoreDocument<Employee>;
    employees: Observable<Employee[]>;
    employee: Observable<Employee>;

    constructor(private angularFireStore: AngularFirestore, private loggingService: LoggingService) {
        this.employeeCollection = this.angularFireStore.collection('employee-list', ref => ref.orderBy('salary', 'asc'));
    }

    /**----- retrieve all the employees from the database -----**/
    getEmployees(): Observable<Employee[]> {
        this.employees = this.employeeCollection.snapshotChanges().map(change => {
            return change.map(action => {
                const data = action.payload.doc.data() as Employee;
                data.id = action.payload.doc.id;

                return data;
            });
        });

        return this.employees;
    }

    /**----- get a single employee from the database -----**/
    getEmployee(id?:string): Observable<Employee> {
        this.employeeDoc = this.angularFireStore.doc<Employee>(`employee-list/${id}`);

        this.employee = this.employeeDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Employee;
                data.id = action.payload.id;

                return data;
            }
        });

        return this.employee;
    }

    /**----- add a new employee to the database -----**/
    newEmployee(employee: Employee) {
        this.employeeCollection.add(employee)
            .then(() => this.loggingService.logMessage('success'))
            .catch(err => this.loggingService.logMessage(err));
    }

    /**----- update an existing employee in the database -----**/
    updateEmployee(employee: Employee) {
        this.employeeDoc = this.angularFireStore.doc(`employee-list/${employee.id}`);
        this.employeeDoc.update(employee)
            .then(() => this.loggingService.logMessage('success'))
            .catch(err => this.loggingService.logMessage(err));
    }

    /**----- remove an employee from the database -----**/
    deleteEmployee(employee: Employee) {
        this.employeeDoc = this.angularFireStore.doc(`employee-list/${employee.id}`);
        this.employeeDoc.delete()
            .then(() => this.loggingService.logMessage('success'))
            .catch(err => this.loggingService.logMessage(err));
    }
}
