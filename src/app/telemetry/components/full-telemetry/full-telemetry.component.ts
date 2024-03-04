import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { IMeasurement } from '../../../models/measurement';
import { ITableColumn } from '../../../models/table';
import { TelemetryService } from '../../../services/telemetry.service';

/**
 * Aggregation types enum
 */
enum AggregationType {
  Average = 'average',
  Max = 'max',
  Min = 'min'
}

@Component({
  selector: 'app-full-telemetry',
  templateUrl: './full-telemetry.component.html',
  styleUrl: './full-telemetry.component.scss'
})
export class FullTelemetryComponent implements OnInit, OnChanges {
  /**
   * Available aggregation types
   */
  public readonly aggregationTypes: AggregationType[] = Object.values(AggregationType);
  /**
   * Properties to aggregate
   */
  private readonly _propToAggregate: Extract<keyof IMeasurement, string>[] = ['pressure', 'temperature', 'omega', 'speed'];
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
   * Selected aggregation type
   */
  public aggregationType: AggregationType = AggregationType.Average;
  /**
   * Aggregated values
   */
  public aggregatedValues: { [prop: string]: number } = {};
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
   * Handles change in aggregation type
   */
  public onAggregationTypeChange({ value }: { value: AggregationType }): void {
    this.aggregationType = value;
    this.updateAggregatedValues();
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
          }),
          tap(measurements => this.updateAggregatedValues())
        );
    }
  }

  /**
   * Update aggregated values
   */
  private updateAggregatedValues(): void {
    const startTime = performance.now();
    this.aggregatedValues = {};
    let operationCallback!: (values: number[]) => number;

    switch (this.aggregationType) {
      case AggregationType.Average:
        operationCallback = (values) => values.reduce((acc, value) => acc + value, 0) / values.length;
        break;
      case AggregationType.Max:
        operationCallback = (values) => Math.max(...values);
        break;
      case AggregationType.Min:
        operationCallback = (values) => Math.min(...values);
        break;
    }

    if (operationCallback) {
      const valuesByProp = this.groupMeasurementsByProp(this._telemetryMeasurements, this._propToAggregate);
      for (const prop in valuesByProp) {
        this.aggregatedValues[prop] = operationCallback(valuesByProp[prop]);
      }
    }

    const endTime = performance.now();
    console.log(`%cupdated aggregation values in ${Math.round(endTime - startTime)}ms`, 'color: green');
  }

  /**
   * Groups measurements by properties
   */
  private groupMeasurementsByProp(values: IMeasurement[], props: Extract<keyof IMeasurement, string>[]): { [prop: string]: number[] } {
    const valuesByProp: { [prop: string]: number[] } = {};
    props?.forEach(prop => {
      valuesByProp[prop] = [];
    });

    values?.forEach(measurement => {
      props?.forEach(prop => {
        valuesByProp[prop].push(+measurement[prop]);
      });
    });

    return valuesByProp;
  }

}
