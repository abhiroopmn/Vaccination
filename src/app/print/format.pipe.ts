import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, header: string): any {
    let result = value;
    switch (header) {
      case 'DOB':
        result = this.datePipe.transform(result);
        break;
      case 'Vac Date':
        result = this.datePipe.transform(result);
        break;
      default:
        result = value;
    }
    return result;
  }
}
