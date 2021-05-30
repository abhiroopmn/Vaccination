import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe, DecimalPipe} from "@angular/common";
import {SharedService} from "../shared/shared.service";

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe, private sharedService: SharedService) {
  }

  transform(value: any, header: string): any {
    let result = value;
    switch (header) {
      case 'Slot Start':
      case 'Slot End':
        // result = this.convertToTime(value);
        break;
      case 'DOB':
      case 'Darwin DOB':
      case 'Vac Date':
      case 'Dose 1 Date':
        result = this.datePipe.transform(result, 'mediumDate');
        break;
      case 'Last 4 Digits of Co-WIN Ref ID':
      case 'Last 4 of Photo ID':
        result = this.sharedService.paddingLeft(result, 4, '0');
        break;
      default:
        result = value;
    }
    return result;
  }

  convertToTime(value: number): string {
    const time = value * 24;
    let hours = Math.floor(time);
    let daytime = 'AM';
    let minutes = (time - hours) * 60;
    if (hours >= 12) {
      if (hours !== 12) {
        hours = hours - 12;
      }
      daytime = 'PM';
    }
    const hour = this.sharedService.paddingLeft(hours, 2, '0');
    const minute = this.sharedService.paddingLeft(minutes, 2, '0');
    return hour + ':' +minute + ' ' + daytime;
  }
}
