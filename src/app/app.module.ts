import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {UploadComponent} from "./upload/upload.component";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {TabMenuModule} from "primeng/tabmenu";
import {DocumentSearchComponent} from "./document-search/document-search.component";
import {SharedService} from "./shared/shared.service";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {PrintComponent} from "./print/print.component";
import {NgxPrintModule} from "ngx-print";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DocumentSearchComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    TabMenuModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    TableModule,
    NgxPrintModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }