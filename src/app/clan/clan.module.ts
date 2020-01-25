import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClanRoutingModule } from './clan-routing.module';
import { ClanComponent } from './clan.component';


@NgModule({
  declarations: [ClanComponent],
  imports: [
    CommonModule,
    ClanRoutingModule
  ]
})
export class ClanModule { }
