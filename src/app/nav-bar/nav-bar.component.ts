import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavTabInfo } from './nav-tab-info';
import { StateService } from '../state/state.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  public navTabInfos: NavTabInfo[];
  public navTabActive: NavTabInfo;


  constructor(
    private router: Router,
    private state: StateService) { }

  ngOnInit() {
    this.navTabInfos = [
      { label: '+', path: '/home', isActive: false }
    ];

    this.subscriptions = [
      this.state.openAccountInfo$.subscribe(id => this.addTab(id, 'player')),
      this.state.openClanInfo$.subscribe(id => this.addTab(id, 'clan')),
      this.activateNavigatedTab()
    ];
  }

  private addTab(id: number, path: string): void {
    const tabsCount = this.navTabInfos.length;

    const newNavTab: NavTabInfo = {
      label: `${path} ${id + tabsCount}`,
      path: `/${path}/${id + tabsCount}`,
      isActive: false
    };

    this.navTabInfos.splice(tabsCount - 1, 0, newNavTab);
    this.router.navigate([newNavTab.path]);
  }

  private activateNavigatedTab(): Subscription {
    return this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEnd) => {
        const link = this.navTabInfos.find(l => l.path === e.urlAfterRedirects);
        this.navTabInfos.forEach(l => {
          l.isActive = false;
        });
        if (link) {
          link.isActive = true;
          this.navTabActive = link;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

}
