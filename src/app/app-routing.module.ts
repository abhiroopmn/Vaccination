import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadComponent} from "./upload/upload.component";
import {DocumentSearchComponent} from "./document-search/document-search.component";
import {PrintComponent} from "./print/print.component";

export const routes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'load', component: UploadComponent},
  {path: 'document-search', component: DocumentSearchComponent},
  {path: 'print', component: PrintComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {

}
