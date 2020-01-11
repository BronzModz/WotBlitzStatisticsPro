import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RealmType } from '../model/realm-type';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private realm = new BehaviorSubject<RealmType>(RealmType.Ru);
  public realm$ = this.realm.asObservable();

  constructor() { }

  public RealmChanged(newRealm: RealmType): void {
    this.realm.next(newRealm);
  }
}
