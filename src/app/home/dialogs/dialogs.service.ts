import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchDialogComponent } from './dialogs/search-dialog/search-dialog.component';
import { SearchType } from './model/search-type';
import { RealmType } from 'src/app/model/realm-type';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public searchByAccount() {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '450px',
      data:  { searchType: SearchType.byAccount, realmType: RealmType.Ru }
    });
  }

  public searchByClan() {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '450px',
      data: { searchType: SearchType.byClan, realmType: RealmType.Ru }
    });
  }

  public wargamingLogin() {

  }
}
