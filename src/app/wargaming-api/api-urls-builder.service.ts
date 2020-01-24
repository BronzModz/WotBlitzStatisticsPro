import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RealmType } from '../model/realm-type';
import { StateService } from '../state/state.service';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { LocaleType } from '../model/locale-type';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsBuilderService {

  private appId: string = environment.wargamingAppId;

  private blitzApiUrls: { [realm: string]: string; } = {};
  private wotApiUrls: { [realm: string]: string; } = {};

  constructor(
    private stateService: StateService
  ) {
    this.blitzApiUrls[`${RealmType.Eu}`] = 'https://api.wotblitz.eu/wotb/';
    this.blitzApiUrls[`${RealmType.Ru}`] = 'https://api.wotblitz.ru/wotb/';
    this.blitzApiUrls[`${RealmType.NA}`] = 'https://api.wotblitz.com/wotb/';
    this.blitzApiUrls[`${RealmType.Asia}`] = 'https://api.wotblitz.asia/wotb/';

    this.wotApiUrls[`${RealmType.Eu}`] = 'https://api.worldoftanks.eu/wot/';
    this.wotApiUrls[`${RealmType.Ru}`] = 'https://api.worldoftanks.ru/wot/';
    this.wotApiUrls[`${RealmType.NA}`] = 'https://api.worldoftanks.com/wot/';
    this.wotApiUrls[`${RealmType.Asia}`] = 'https://api.worldoftanks.asia/wot/';
  }

  private blitzBaseUrl$ = this.stateService.realm$
    .pipe(
      map((r: RealmType) => this.blitzApiUrls[`${r}`])
  );

  private wotBaseUrl$ = this.stateService.realm$
    .pipe(
      map((r: RealmType) => this.wotApiUrls[`${r}`])
    );

  private locale$ = this.stateService.locale$
    .pipe(
      map((l: LocaleType) => l as string)
    );

  // https://api.worldoftanks.ru/wot/account/list/?application_id=demo&language=en&search=
  public searchUrl$ = combineLatest([
    this.wotBaseUrl$,
    this.locale$
  ]).pipe(
    map(([baseUrl, locale]) => `${baseUrl}account/list/?application_id=${this.appId}&language=${locale}&search=`),
    shareReplay(1)
  );

  // https://api.wotblitz.ru/wotb/clans/list/?application_id=demo&search=xxx_l
  public searchClanUrl$ = combineLatest([
    this.blitzBaseUrl$,
    this.locale$
  ]).pipe(
    map(([baseUrl, locale]) => `${baseUrl}clans/list/?application_id=${this.appId}&language=${locale}&search=`),
    shareReplay(1)
  );

}
