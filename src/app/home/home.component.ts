import { Component, OnInit } from '@angular/core';
import { DialogsService } from './dialogs/dialogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService: DialogsService) { }

  ngOnInit() {
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
