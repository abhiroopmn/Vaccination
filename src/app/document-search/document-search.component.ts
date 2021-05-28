import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import * as XLSX from 'xlsx';
import {WorkBook} from "xlsx";

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

  constructor(private sharedService: SharedService) {
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
        const worksheet = this.workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        this.jsonFile = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        this.headers = Object.keys(this.jsonFile[0]);
        this.sharedService.setHeaders(this.headers);
        console.log(this.jsonFile);

      }
      // const workbook: WorkBook = XLSX.read(this.arrayBuffer);
      // const workbook: WorkBook = XLSX.readFile(this.sharedService.file.name);
    }
  }

  search() {
    this.details = this.jsonFile.filter(x => x['Empl ID'] == this.emplid);
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

        popWin.print();
      }
    }
    //  mywindow.close();

    return true;
  }
}
