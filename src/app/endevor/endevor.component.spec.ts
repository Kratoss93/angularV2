import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndevorComponent } from './endevor.component';

describe('EndevorComponent', () => {
  let component: EndevorComponent;
  let fixture: ComponentFixture<EndevorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndevorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndevorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
