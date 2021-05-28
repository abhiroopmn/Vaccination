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
  headersToBeExcluded = ['Empl ID', 'Empl EMAIL'];

  constructor(private sharedService: SharedService) {
    this.sharedService.details.subscribe(details => this.details = details);
    this.sharedService.headers.subscribe(headers => this.headers = headers);
  }
}
