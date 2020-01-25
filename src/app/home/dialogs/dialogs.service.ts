import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchDialogComponent } from './dialogs/search-dialog/search-dialog.component';
import { SearchType } from './model/search-type';
import { RealmType } from '../../model/realm-type';
import { SearchDialogResult } from './model/search-dialog-result';
import { StateService } from '../../state/state.service';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog,
              private state: StateService) { }

  public searchByAccount() {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '450px',
      data:  { searchType: SearchType.byAccount }
    });

    dialogRef.afterClosed()
      .subscribe((result: SearchDialogResult) => {
        if (result) {
          this.state.OpenAccountInfoEvent(result.selectedId);
        }
      });
  }

  public searchByClan() {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '450px',
      data: { searchType: SearchType.byClan }
    });

    dialogRef.afterClosed()
    .subscribe((result: SearchDialogResult) => {
      if (result) {
        this.state.OpenClanInfoEvent(result.selectedId);
      }
    });
  }

  public wargamingLogin() {

  }
}
