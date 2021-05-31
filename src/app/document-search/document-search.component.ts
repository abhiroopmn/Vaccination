import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import * as XLSX from 'xlsx';
import {WorkBook, WorkSheet} from "xlsx";
import {MessageService} from "primeng/api";

@Component({
  selector: 'document-search',
  templateUrl: 'document-search.component.html',
  styleUrls: ['document-search.component.scss']
})
export class DocumentSearchComponent implements OnInit {
  arrayBuffer: any;
  workbook: WorkBook | undefined;
  emplid: number | string = '';
  jsonFile: any[] = [];
  details: any[] = [];
  headers: string[] = [];
  totalCount = 0;
  worksheet: WorkSheet | undefined;
  vaccinatedEmployees: any[] = [];

  constructor(private sharedService: SharedService, private messageService: MessageService) {
    this.sharedService.vaccinatedEmployees.subscribe(emps => {
      this.vaccinatedEmployees = emps;
      this.totalCount = emps.length
    });
  }

  ngOnInit(): void {
    this.arrayBuffer = undefined;
    if (this.sharedService.file) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.sharedService.file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        const data = new Uint8Array(this.arrayBuffer);
        const arr = [];
        for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        const bstr = arr.join("");
        this.workbook = XLSX.read(bstr, {type:"binary"});
        const first_sheet_name = this.workbook.SheetNames[0];
        this.worksheet = this.workbook.Sheets[first_sheet_name];
        this.jsonFile = XLSX.utils.sheet_to_json(this.worksheet,{raw:false});
        this.headers = Object.keys(this.jsonFile[0]);
        this.sharedService.setHeaders(this.headers);
        this.restoreVaccinatedEmployeesList();
        if (this.worksheet) {
          this.messageService.add({detail: 'Successfully loaded data from file', severity: 'success'});
        }
      }
    }
  }

  restoreVaccinatedEmployeesList() {
    const storedValue = localStorage.getItem('qvTokenList');
    if (storedValue) {
      const selectedTokens = JSON.parse(storedValue);
      this.sharedService.setVaccinatedEmployees(this.jsonFile.filter(x => selectedTokens.includes(x['Token'])));
    }
  }

  search() {
    this.details = this.jsonFile.filter(x => x['Token'] == this.emplid);
    if (this.details.length === 0) {
      this.details = this.jsonFile.filter(x => x['Empl ID'] == this.emplid);
    }

    if (this.details.length === 0) {
      this.messageService.add({detail: 'No match found', severity: 'warn'});
    }
    this.sharedService.setDetails(this.details);
  }

  print() {
    // const printContent = document.getElementById("print");
    // if (printContent) {
    //   const windowPort = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    //   if (windowPort) {
    //     windowPort.document.write(printContent.innerHTML);
    //     windowPort.document.close();
    //     windowPort.focus();
    //     windowPort.print();
    //     windowPort.close();
    //   }
    // }

    // window.print();


    const elem = window.document.getElementById('print');
    if (elem) {
      let data = elem.innerHTML;
      let popWin = window.open('print', '_blank');
      if (popWin) {
        popWin.document.write('<html><head><title>my div</title>');
        popWin.document.write('<link rel="stylesheet" href="styles.css" type="text/css" />');
        popWin.document.write('</head><body >');
        popWin.document.write(data);
        popWin.document.write('</body></html>');

        setTimeout(() => {
          if (popWin) {
            popWin.print();
          }
        }, 2000);
      }
    }
    //  mywindow.close();

    return true;
  }

  saveStatus() {
    const storedValue = localStorage.getItem('qvTokenList');
    if (storedValue && this.worksheet) {
      const selectedTokens = JSON.parse(storedValue);
      // this.jsonFile.forEach(row => {
      //   if (selectedTokens.includes(row['Token'])) {
      //     row['Vaccinated'] = 1;
      //   }
      // })
      if (this.worksheet['!ref']) {
        const range = XLSX.utils.decode_range(this.worksheet['!ref']);
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          // Example: Get third cell in each row, i.e. Column "C"
          const thirdCell = this.worksheet[XLSX.utils.encode_cell({r: rowNum, c: 2})];
          // NOTE: secondCell is undefined if it does not exist (i.e. if its empty)
          if (thirdCell) {
            let value = selectedTokens.includes(String(thirdCell.v)) ? 1 : 0;
            if (this.worksheet['R'+(rowNum+1)]) {
              this.worksheet['R'+(rowNum+1)].v = value;
            } else {
              XLSX.utils.sheet_add_aoa(this.worksheet, [[value]], {origin: 'R'+(rowNum+1)})
            }
          }

        }
        if (this.workbook && this.sharedService.file) {
          XLSX.writeFile(this.workbook, this.sharedService.file.name);
          this.messageService.add({detail: 'File has been updated', severity: 'success'})
        }
      }
    }
  }
}
