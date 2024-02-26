import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IMeasurement } from '../models/measurement';
import { TelemetryService } from '../services/telemetry.service';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.scss'
})
export class TelemetryComponent implements OnInit {
  /**
   * Telemetry data Observable
   */
  public telemetryData$!: Observable<IMeasurement[]>;
  /**
   * Columns to be displayed in the table
   */
  public displayedColumns: string[] = ['timestamp', 'carId', 'pressure', 'position', 'temperature', 'omega', 'speed'];
  /**
   * Raw telemetry data
   */
  private _rawTelemetryData: IMeasurement[] = [];

  constructor(private _telemetryService: TelemetryService) { }

  public ngOnInit(): void {
    this.telemetryData$ = this._telemetryService.getTelemetryUpdates()
      .pipe(map(data => {
        this._rawTelemetryData.push(...data);
        return this._rawTelemetryData;
      }));
  }

}
