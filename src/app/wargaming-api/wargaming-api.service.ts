import { Injectable } from '@angular/core';
import { ApiUrlsBuilderService } from './api-urls-builder.service';
import { Observable, combineLatest, throwError } from 'rxjs';
import { PlayerInfo } from '../model/player-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, mergeMap, tap, filter } from 'rxjs/operators';
import { ClanInfo } from '../model/clan-info';

@Injectable({
  providedIn: 'root'
})
export class WargamingApiService {

  constructor(
    private http: HttpClient,
    private urlsBuilder: ApiUrlsBuilderService) { }

  public findPlayers(accountNickTemplate$: Observable<string>, minSymbolsCount: number): Observable<PlayerInfo[]> {
    return combineLatest([
      this.urlsBuilder.searchUrl$,
      accountNickTemplate$
    ]).pipe(
      filter(([searchUrl, nickTemplate]) => nickTemplate.length >= minSymbolsCount),
      tap(([searchUrl, nickTemplate]) => console.log(`${searchUrl}${nickTemplate}`)),
      mergeMap(([searchUrl, nickTemplate]) =>
        this.http.get<any>(`${searchUrl}${nickTemplate}`)
          .pipe(
            map(r => r.data as PlayerInfo[]),
            catchError(this.handleError)
        )
      )
    );
  }

  public findClans(clanTemplate$: Observable<string>): Observable<ClanInfo[]> {
    return combineLatest([
      this.urlsBuilder.searchClanUrl$,
      clanTemplate$
    ]).pipe(
      filter(([searchUrl, clanTemplate]) => clanTemplate.length >= 1),
      tap(([searchUrl, clanTemplate]) => console.log(`${searchUrl}${clanTemplate}`)),
      mergeMap(([searchUrl, clanTemplate]) =>
        this.http.get<any>(`${searchUrl}${clanTemplate}`)
          .pipe(
            map(r => r.data as ClanInfo[]),
            catchError(this.handleError)
        )
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Wargaming API returned code ${error.status}, ` + `body was: ${error.error}`;
    }
    console.error(errorMessage);
    // return an observable with a user-facing error message
    return throwError(`Can not load data from Wargaming API; please try again later. Error: ${errorMessage}`);
  }

}
