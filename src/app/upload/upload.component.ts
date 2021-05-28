import {Component} from "@angular/core";
import {FileUpload} from "primeng/fileupload";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'vaccine-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss']
})
export class UploadComponent {
  file: File | undefined;

  constructor(private router: Router, private sharedService: SharedService) {
  }


  uploadFile(event: any, fileUploader: FileUpload): void {
    this.file = event.files[0];
    this.sharedService.file = this.file;
    this.router.navigateByUrl('document-search')
  }
}
