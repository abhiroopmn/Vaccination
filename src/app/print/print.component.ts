import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'vaccine-print',
  templateUrl: 'print.component.html',
  styleUrls: ['print.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrintComponent {
  details: any[] = [];
  headers: string[] = [];
  headersToBeExcluded = ['Empl ID', 'Email ID', 'Employee Name', 'Vaccinated'];
  vaccinatedEmployees: any[] = [];

  constructor(private sharedService: SharedService) {
    this.sharedService.details.subscribe(details => this.details = details);
    this.sharedService.headers.subscribe(headers => this.headers = headers);
    this.sharedService.vaccinatedEmployees.subscribe(emps => this.vaccinatedEmployees = emps);
  }

  onRowSelect(event: any) {
    console.log(event);
    console.log(this.vaccinatedEmployees);
    this.sharedService.setVaccinatedEmployees(this.vaccinatedEmployees);
  }

  // onHeaderCheckboxToggle(event: any) {
  //   console.log(event);
  //   console.log(this.vaccinatedEmployees);
  // }

  onRowUnselect(event: any) {
    console.log(event);
    console.log(this.vaccinatedEmployees);
    this.sharedService.setVaccinatedEmployees(this.vaccinatedEmployees);
  }
}
