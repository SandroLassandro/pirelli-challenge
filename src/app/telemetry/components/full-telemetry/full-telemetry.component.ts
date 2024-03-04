import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IMeasurement } from '../../../models/measurement';
import { ITableColumn } from '../../../models/table';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-full-telemetry',
  templateUrl: './full-telemetry.component.html',
  styleUrl: './full-telemetry.component.scss'
})
export class FullTelemetryComponent implements OnInit, OnChanges {
  /**
   * Selected car Ids
   */
  @Input() public carIds!: string[];
  /**
   * Columns to be displayed
   */
  public columns!: ITableColumn<IMeasurement>[];
  /**
   * Observable for telemetry measurements
   */
  public telemetryMeasurements!: Observable<IMeasurement[]>;
  /**
   * Internal storage for telemetry measurements
   */
  private _telemetryMeasurements: IMeasurement[] = [];

  constructor(private _telemetryService: TelemetryService) { }

  public ngOnInit(): void {
    this.columns = [
      { name: 'timestamp', templateName: 'timestamp', isSortable: true, isSticky: true },
      { name: 'carId', caption: 'car', isSortable: true, isSticky: true },
      { name: 'position', isSticky: true },
      { name: 'pressure', templateName: 'pressure', isSortable: true },
      { name: 'temperature', templateName: 'temperature', isSortable: true },
      { name: 'omega', templateName: 'omega', isSortable: true },
      { name: 'speed', templateName: 'speed', isSortable: true }
    ];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['carIds']) {
      this.setupTelemetryUpdates(this.carIds);
    }
  }

  /**
   * Setup observable to telemetry updates
   */
  private setupTelemetryUpdates(carIds: string[]): void {
    this._telemetryMeasurements = [];

    if (carIds?.length) {
      this.telemetryMeasurements = this._telemetryService.getTelemetryUpdates(carIds)
        .pipe(
          map(measurements => {
            this._telemetryMeasurements.push(...measurements);
            return this._telemetryMeasurements;
          })
        );
    }
  }
}
