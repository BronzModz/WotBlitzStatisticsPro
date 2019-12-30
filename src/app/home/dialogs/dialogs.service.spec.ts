import { TestBed } from '@angular/core/testing';

import { DialogsService } from './dialogs.service';
import { MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DialogsService', () => {
  let mockMatDialog: MatDialog;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      providers: [
        DialogsService,
        {provide: MatDialog, useValue: mockMatDialog}

      ]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: DialogsService = TestBed.get(DialogsService);
    expect(service).toBeTruthy();
  });
});
