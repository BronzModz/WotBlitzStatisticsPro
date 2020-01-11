import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogsService } from './dialogs/dialogs.service';
import { StateService } from '../state/state.service';
import { RealmType } from '../model/realm-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public realm$ = this.stateService.realm$;

  constructor(
    private dialogService: DialogsService,
    private stateService: StateService) { }

  ngOnInit() {
  }

  public realmChanged(value: RealmType) {
    this.stateService.RealmChanged(value);
  }

  public searchByAccount() {
    this.dialogService.searchByAccount();
  }

  public searchByClan() {
    this.dialogService.searchByClan();
  }

  public loginWithWargamingId() {
    this.dialogService.wargamingLogin();
  }

}
