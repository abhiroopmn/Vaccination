import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {
  transform(selectedData: any[], row: any): boolean {
    let found = false;
    if (Array.isArray(row)) {
      if (row.length > 0) {
        row.forEach(detail => {
          if (selectedData.find(x => x['Token'] === detail['Token'])) {
            found = true;
          }
        });
      }
    } else {
      found = selectedData.find(x => x['Token'] === row['Token']);
    }
    return found;
  }
}
