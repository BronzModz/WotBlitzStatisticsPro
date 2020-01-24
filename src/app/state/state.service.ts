import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RealmType } from '../model/realm-type';
import { LocaleType } from '../model/locale-type';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private realm = new BehaviorSubject<RealmType>(RealmType.Ru);
  public realm$ = this.realm.asObservable();

  private locale = new BehaviorSubject<LocaleType>(LocaleType.Ru);
  public locale$ = this.locale.asObservable();

  private openAccountInfo = new Subject<number>();
  public openAccountInfo$ = this.openAccountInfo.asObservable();

  private openClanInfo = new Subject<number>();
  public openClanInfo$ = this.openClanInfo.asObservable();

  constructor() { }

  public LocaleChanged(newLocale: LocaleType) {
    this.locale.next(newLocale);
  }

  public RealmChanged(newRealm: RealmType): void {
    this.realm.next(newRealm);
  }

  public OpenAccountInfoEvent(accountId: number): void {
    this.openAccountInfo.next(accountId);
  }

  public OpenClanInfoEvent(clanId: number): void {
    this.openClanInfo.next(clanId);
  }
}
