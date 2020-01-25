import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'player/:id', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) },
  { path: 'clan/:id', loadChildren: () => import('./clan/clan.module').then(m => m.ClanModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
