import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogsService } from './dialogs/dialogs.service';
import { SearchDialogComponent } from './dialogs/dialogs/search-dialog/search-dialog.component';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, SearchDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    DialogsService
  ],
  entryComponents: [
    SearchDialogComponent
  ]
})
export class HomeModule { }
