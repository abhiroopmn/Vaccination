import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedService {
  file: File | undefined;
  headers = new BehaviorSubject<string[]>([]);
  details = new BehaviorSubject<string[]>([]);
  vaccinatedEmployees = new BehaviorSubject<any[]>([]);

  setDetails(detail: string[]) {
    this.details.next(detail)
  }

  setHeaders(header: string[]) {
    this.headers.next(header);
  }

  paddingLeft(value: number | string, noOfChars: number, paddingChar: string): string | number {
    if (value) {
      value = value.toString().trim();
      if (value.length > noOfChars) {
        value = value.substring(value.length - 4, value.length);
      }
      while (value.length < noOfChars) {
        value = paddingChar + value;
      }
    }
    return value;
  }

  setVaccinatedEmployees(list: any[]) {
    this.vaccinatedEmployees.next(list);
    localStorage.setItem("qvTokenList", JSON.stringify(list.map(x => x['Token'])));
  }
}
