import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchType } from '../../model/search-type';
import { SearchCondition } from '../../model/search-condition';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  public searchCondition: SearchCondition;
  public searchPlaceholder: string;

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data: SearchCondition  ) {
    this.searchCondition = data;
    this.searchPlaceholder = this.searchCondition.searchType === SearchType.byAccount ? 'Account' : 'Clan';
    console.log(this.searchCondition);
  }

  ngOnInit() {
  }

  select() {
    this.dialogRef.close(12345);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
