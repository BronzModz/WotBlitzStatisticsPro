import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { DialogsService } from './dialogs/dialogs.service';
import { StateService } from '../state/state.service';
import { RealmType } from '../model/realm-type';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockDialogService: DialogsService;
  let stateService: StateService;

  beforeEach(async(() => {
    mockDialogService = jasmine.createSpyObj(['searchByAccount', 'searchByClan', 'wargamingLogin']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MaterialModule],
      providers: [
        { provide: DialogsService, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    stateService = fixture.debugElement.injector.get(StateService);
    // ngOnInit
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call wargamingLogin service method when Login button clicked', () => {
    const loginButton = fixture.debugElement.query(By.css('#loginButton'));
    loginButton.triggerEventHandler('click', { stopPropagation: () => { } });

    expect(mockDialogService.wargamingLogin).toHaveBeenCalledTimes(1);
  });

  it('should call search by account service method when seearchByLogin button clicked', () => {
    const loginButton = fixture.debugElement.query(By.css('#searchByAccountButton'));
    loginButton.triggerEventHandler('click', { stopPropagation: () => { } });

    expect(mockDialogService.searchByAccount).toHaveBeenCalledTimes(1);
  });

  it('should call searchByClan service method when searchByClanButton button clicked', () => {
    const loginButton = fixture.debugElement.query(By.css('#searchByClanButton'));
    loginButton.triggerEventHandler('click', { stopPropagation: () => { } });

    expect(mockDialogService.searchByClan).toHaveBeenCalledTimes(1);
  });

  it('should change state when realm button clicked', done => {
    const realmButtonsGroup = fixture.debugElement.query(By.css('#realmButtonsGroup'));
    realmButtonsGroup.triggerEventHandler('change', { value: RealmType.Asia });

    stateService.realm$.subscribe(r => {
      expect(r).toBe(RealmType.Asia);
      done();
    });

  });
});
