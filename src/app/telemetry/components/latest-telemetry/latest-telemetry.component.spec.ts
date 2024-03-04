import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelemetryModule } from '../../telemetry.module';
import { LatestTelemetryComponent } from './latest-telemetry.component';

describe('LatestTelemetryComponent', () => {
  let component: LatestTelemetryComponent;
  let fixture: ComponentFixture<LatestTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LatestTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
