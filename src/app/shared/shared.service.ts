import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SharedService {
  file: File | undefined;
  headers = new BehaviorSubject<string[]>([]);
  details = new BehaviorSubject<string[]>([]);
  vaccinatedEmployees = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
  }

  setDetails(detail: string[]) {
    this.details.next(detail)
  }

  setHeaders(header: string[]) {
    this.headers.next(header);
  }

  paddingLeft(value: number | string, noOfChars: number, paddingChar: string): string {
    value = value.toString();
    if (value.length > noOfChars) {
      value = value.substring(0, noOfChars-1);
    }
    while (value.length < noOfChars) {
      value = paddingChar + value;
    }
    return value;
  }

  setVaccinatedEmployees(list: any[]) {
    this.vaccinatedEmployees.next(list);
    localStorage.setItem("qvTokenList", JSON.stringify(list.map(x => x['Token'])));
  }
}
