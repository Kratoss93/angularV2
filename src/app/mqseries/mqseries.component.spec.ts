import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqseriesComponent } from './mqseries.component';

describe('MqseriesComponent', () => {
  let component: MqseriesComponent;
  let fixture: ComponentFixture<MqseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MqseriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MqseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
