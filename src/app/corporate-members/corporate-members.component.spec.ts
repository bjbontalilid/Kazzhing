import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMembersComponent } from './corporate-members.component';

describe('CorporateMembersComponent', () => {
  let component: CorporateMembersComponent;
  let fixture: ComponentFixture<CorporateMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
