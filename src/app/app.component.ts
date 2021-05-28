import { Component } from '@angular/core';
import {FileUpload} from "primeng/fileupload";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vaccination';
  items = [
    {label: 'Upload', icon: 'pi pi-upload', routerLink: '/upload'},
    {label: 'Document Search', icon: 'pi pi-search', routerLink: '/document-search'},
  ];
  activeItem = this.items[0];

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const item =  this.items.find(x => x.routerLink === event.url);
        this.activeItem = item || this.items[0];
      }
    });
  }
}
