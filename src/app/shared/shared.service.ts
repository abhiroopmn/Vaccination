import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedService {
  file: File | undefined;
  headers = new BehaviorSubject<string[]>([]);
  details = new BehaviorSubject<string[]>([]);


  setDetails(detail: string[]) {
    this.details.next(detail)
  }

  setHeaders(header: string[]) {
    this.headers.next(header);
  }
}
