import { TestBed } from '@angular/core/testing';

import { ApiUrlsBuilderService } from './api-urls-builder.service';
import { StateService } from '../state/state.service';
import { RealmType } from '../model/realm-type';
import { LocaleType } from '../model/locale-type';
import { environment } from '../../environments/environment';

describe('ApiUrlsBuilderService', () => {
  let apiUrlBuilderService: ApiUrlsBuilderService;
  let stateService: StateService;
  const appId = environment.wargamingAppId;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    stateService = TestBed.get(StateService);
    apiUrlBuilderService = TestBed.get(ApiUrlsBuilderService);

  });

  it('should be created', () => {
    expect(apiUrlBuilderService).toBeTruthy();
  });

  it('should return appropriate searchAccount URL', done => {
    stateService.RealmChanged(RealmType.Eu);
    stateService.LocaleChanged(LocaleType.De);

    apiUrlBuilderService.searchUrl$.subscribe(url => {
      expect(url).toBe(
        `https://api.worldoftanks.eu/wot/account/list/?application_id=${appId}&language=de&search=`);
      done();
    });
  });

  it('should return appropriate searchClan URL', done => {
    stateService.RealmChanged(RealmType.Eu);
    stateService.LocaleChanged(LocaleType.De);

    apiUrlBuilderService.searchClanUrl$.subscribe(url => {
      expect(url).toBe(
        `https://api.wotblitz.eu/wotb/clans/list/?application_id=${appId}&language=de&search=`);
      done();
    });
  });
});
