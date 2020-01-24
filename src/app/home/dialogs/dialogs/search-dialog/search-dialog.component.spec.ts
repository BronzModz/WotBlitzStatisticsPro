import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { MaterialModule } from '../../../../material.module';

import { SearchDialogComponent } from './search-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WargamingApiService } from 'src/app/wargaming-api/wargaming-api.service';
import { SearchCondition } from '../../model/search-condition';
import { SearchType } from '../../model/search-type';
import { of, from } from 'rxjs';
import { PlayerInfo } from 'src/app/model/player-info';
import { ClanInfo } from 'src/app/model/clan-info';
import { By } from '@angular/platform-browser';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;
  let mockMatDialogRef: MatDialogRef<SearchDialogComponent>;
  let wgApiServiceMock;
  let data: SearchCondition;
  let PLAYERS: PlayerInfo[];
  let CLANS: ClanInfo[];

  beforeEach(async(() => {
    data = { searchType: SearchType.byAccount };

    PLAYERS = [
      { account_id: 5, nickname: 'boo' },
      { account_id: 8, nickname: 'yeah' }
    ];

    CLANS = [
      { clan_id: 4, tag: 'ABC', name: 'abc clan', members_count: 45, created_at: 0 },
      { clan_id: 16, tag: 'CCC', name: 'ccc clan', members_count: 5, created_at: 0 },
    ];

    mockMatDialogRef = jasmine.createSpyObj(['close']);
    wgApiServiceMock = jasmine.createSpyObj('WargamingApiService', ['findPlayers', 'findClans'])

    wgApiServiceMock.findPlayers.and.returnValue(of(PLAYERS));
    wgApiServiceMock.findClans.and.returnValue(of(CLANS));

    TestBed.configureTestingModule({
      declarations: [SearchDialogComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: WargamingApiService, useValue: wgApiServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/* ToDo: There are some proplemss with testing OnPush and propertis instanciating in ngAfterViewInit...
  it('should show appropriate players list', () => {
    data.searchType = SearchType.byAccount;
    fixture.detectChanges();

    const playersList = fixture.debugElement.queryAll(By.css('mat-list-item'));

    expect(playersList.length).toBe(2);
    expect(playersList[0].nativeElement.textContent).toContain(PLAYERS[0].nickname);
  });

  it('should show appropriate clans list', () => {
    data.searchType = SearchType.byClan;
    fixture.detectChanges();

  });

  it('should close dialog and pass id as parameter when list item clicked', () => {
    data.searchType = SearchType.byAccount;
    fixture.detectChanges();

  });
  */
});

