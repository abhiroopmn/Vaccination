import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {
  transform(selectedData: any[], row: any): boolean {
    const found = selectedData.find(x => x['Token'] === row['Token']);
    return !!found;
  }
}
