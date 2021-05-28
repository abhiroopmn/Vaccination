import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SharedService {
  file: File | undefined;
  headers = new BehaviorSubject<string[]>([]);
  details = new BehaviorSubject<string[]>([]);
  private fileUrl = 'https://qualcomm-my.sharepoint.com/:x:/r/personal/mnabhiro_qti_qualcomm_com/Documents/Qvaccine_BglrDrive_May31_Schedule_Print_Sample.xlsx?d=w852ae82f0a884da9905122d054d73d5a&csf=1&web=1&e=NAcbTd';

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

  loadFile(): Observable<any> {
    return this.http.get(this.fileUrl);
  }
}
