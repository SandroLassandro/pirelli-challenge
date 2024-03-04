import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { IMeasurement } from '../../../models/measurement';
import { ITableColumn } from '../../../models/table';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-latest-telemetry',
  templateUrl: './latest-telemetry.component.html',
  styleUrl: './latest-telemetry.component.scss'
})
export class LatestTelemetryComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Specify the order in which positions should be displayed
   */
  private readonly _positionOrder = ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'];
  /**
   * Selected car Ids
   */
  @Input() public carIds!: string[];
  /**
   * Columns to be displayed
   */
  public columns!: ITableColumn<IMeasurement>[];
  /**
   * Telemetry measurements grouped by position
   */
  public measurementsByPosition!: IMeasurement[][];
  /**
   * Subscription to telemetry updates
   */
  private _telemetrySubscription!: Subscription;

  constructor(private _telemetryService: TelemetryService) { }

  public ngOnInit(): void {
    this.columns = [
      { name: 'timestamp', templateName: 'timestamp', enableRowspan: true },
      { name: 'carId', enableRowspan: true },
      { name: 'position', enableRowspan: true },
      { name: 'pressure', templateName: 'pressure', },
      { name: 'temperature', templateName: 'temperature', },
      { name: 'omega', templateName: 'omega', },
      { name: 'speed', templateName: 'speed', }
    ];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['carIds']) {
      this.setupTelemetryUpdates(this.carIds);
    }
  }

  public ngOnDestroy(): void {
    this._telemetrySubscription?.unsubscribe();
  }

  /**
   * Setup subscription to telemetry updates
   */
  private setupTelemetryUpdates(carIds: string[]): void {
    this._telemetrySubscription?.unsubscribe();

    if (carIds?.length) {
      this._telemetrySubscription = this._telemetryService.getTelemetryUpdates(carIds)
        .pipe(
          map(measurements => {
            const measurementsByPosition: { [position: string]: IMeasurement[] } = {};
            measurements?.forEach(measurement => {
              if (measurement) {
                measurementsByPosition[measurement.position] = measurementsByPosition[measurement.position] ?? [];
                measurementsByPosition[measurement.position].push(measurement);
              }
            });
            return measurementsByPosition;
          })
        )
        .subscribe(groups => {
          this.measurementsByPosition = Object.values(groups).sort((a, b) => {
            const indexA = this._positionOrder.indexOf(a[0].position);
            const indexB = this._positionOrder.indexOf(b[0].position);
            return indexA - indexB;
          });
        });
    }
  }

}
