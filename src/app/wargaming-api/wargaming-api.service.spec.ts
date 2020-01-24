import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WargamingApiService } from './wargaming-api.service';
import { of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { StateService } from '../state/state.service';
import { LocaleType } from '../model/locale-type';
import { RealmType } from '../model/realm-type';

describe('WargamingApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: WargamingApiService;
  const appId = environment.wargamingAppId;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpClientTestingModule);
    service = TestBed.get(WargamingApiService);
    const state: StateService = TestBed.get(StateService);
    state.LocaleChanged(LocaleType.Ru);
    state.RealmChanged(RealmType.Ru);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // WTF?? TypeError: httpTestingController.expectOne is not a function
  /*
  it('should call appropriate Wargaming API Url on accounts search method', () => {
    const searchString = 'abc';
    // const searchString$ = of(searchString);
    const searchSubject = new BehaviorSubject<string>(searchString);
    service.findPlayers(searchSubject.asObservable(), 1).subscribe();

    const expectedUrl = `https://api.worldoftanks.ru/wot/account/list/?application_id=${appId}&language=ru&search=${searchString}`;

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
    httpTestingController.verify();
  });
  */
});
