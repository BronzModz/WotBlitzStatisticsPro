import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClanComponent } from './clan.component';

const routes: Routes = [{ path: '', component: ClanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClanRoutingModule { }
