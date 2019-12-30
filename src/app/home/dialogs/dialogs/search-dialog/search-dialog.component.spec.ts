import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../../material.module';

import { SearchDialogComponent } from './search-dialog.component';
import { MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;
  let mockMatDialogRef: MatDialogRef<SearchDialogComponent>;

  beforeEach(async(() => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    TestBed.configureTestingModule({
      declarations: [SearchDialogComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        {provide: MatDialogRef, useValue: mockMatDialogRef}
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
});

