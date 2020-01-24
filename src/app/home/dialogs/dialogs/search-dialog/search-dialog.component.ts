import { Component, OnInit, Optional, Inject, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SearchType } from '../../model/search-type';
import { SearchCondition } from '../../model/search-condition';
import { WargamingApiService } from 'src/app/wargaming-api/wargaming-api.service';
import { BehaviorSubject, Observable, fromEvent, EMPTY, empty } from 'rxjs';
import { PlayerInfo } from 'src/app/model/player-info';
import { map, startWith, debounceTime, distinctUntilChanged, tap, catchError } from 'rxjs/operators';
import { SearchDialogResult } from '../../model/search-dialog-result';
import { ClanInfo } from 'src/app/model/clan-info';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDialogComponent implements AfterViewInit {
  public accountsSearchMinSymbolsCount = 3;

  public searchCondition: SearchCondition;
  public searchPlaceholder: string;

  public error$ = new BehaviorSubject<string>(null);
  public searchString$: Observable<string>;
  public accountsList$: Observable<PlayerInfo[]>;
  public clansList$: Observable<ClanInfo[]>;


  @ViewChild('searchInput', { static: false })
  searchInput: ElementRef;

  constructor(private wgApiService: WargamingApiService,
              private dialogRef: MatDialogRef<SearchDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data: SearchCondition) {
    this.searchCondition = data;
    this.searchPlaceholder = this.searchCondition.searchType === SearchType.byAccount ? 'Account' : 'Clan';
  }

  ngAfterViewInit(): void {
    this.searchString$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value as string),
        startWith(''),
        debounceTime(900),
        distinctUntilChanged()
      );

    this.accountsList$ = this.wgApiService.findPlayers(this.searchString$, this.accountsSearchMinSymbolsCount)
      .pipe(
        catchError(err => {
          this.error$.next(err);
          return EMPTY;
        }));

    this.clansList$ = this.wgApiService.findClans(this.searchString$)
      .pipe(
        catchError(err => {
          this.error$.next(err);
          return EMPTY;
        }));
  }

  itemClicked(id: number) {
    this.dialogRef.close({
      searchType: this.searchCondition.searchType,
      selectedId: id
    } as SearchDialogResult);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
