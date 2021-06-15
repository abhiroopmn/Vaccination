import {Component} from "@angular/core";
import {FileUpload} from "primeng/fileupload";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'vaccine-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss']
})
export class UploadComponent {
  file: File | undefined;
  showDeleteConfirmDialog = false;

  constructor(private router: Router, private sharedService: SharedService, private messageService: MessageService) {
  }


  uploadFile(event: any, fileUploader: FileUpload): void {
    this.file = event.files[0];
    this.sharedService.file = this.file;
    this.router.navigateByUrl('document-search')
  }

  deleteSavedData() {
    localStorage.clear();
    this.sharedService.setVaccinatedEmployees([]);
    this.showDeleteConfirmDialog = false;
    this.messageService.add({detail: 'All the data has been erased', severity: 'success'});
  }
}
