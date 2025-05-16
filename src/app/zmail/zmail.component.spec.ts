import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmailComponent } from './zmail.component';

describe('ZmailComponent', () => {
  let component: ZmailComponent;
  let fixture: ComponentFixture<ZmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
