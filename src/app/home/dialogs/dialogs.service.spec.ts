import { TestBed } from '@angular/core/testing';

import { DialogsService } from './dialogs.service';

describe('DialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DialogsService
    ]
  }).compileComponents()
  );

  it('should be created', () => {
    const service: DialogsService = TestBed.get(DialogsService);
    expect(service).toBeTruthy();
  });
});
