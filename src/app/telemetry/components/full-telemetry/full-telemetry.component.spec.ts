import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelemetryModule } from '../../telemetry.module';
import { FullTelemetryComponent } from './full-telemetry.component';

describe('FullTelemetryComponent', () => {
  let component: FullTelemetryComponent;
  let fixture: ComponentFixture<FullTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FullTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
