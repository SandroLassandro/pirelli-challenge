import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, interval, map, switchMap, take, takeUntil, takeWhile } from 'rxjs';
import { IMeasurement, Measurements } from '../models/measurement';

/**
 * Type for grouped measurements by timestamp for each carId
 */
type GroupedMeasurements = { [carId: string]: { [timestamp: string]: IMeasurement[] } };

@Injectable({
  providedIn: 'root'
})
export class TelemetryService implements OnDestroy {
  /**
   * Path to the CSV file containing measurements data
   */
  private readonly _csvPath = 'assets/data_measurements_finals.csv';
  /**
   * Datasource dictionary storing measurements data grouped by carId
   */
  private _datasource: { [carId: string]: IMeasurement[][] } = {};
  /**
   * Subject to notify when datasource is loaded
   */
  private _datasourceLoaded$ = new BehaviorSubject<boolean>(false);
  /**
   * Subject to signal the destruction of the service
   */
  private _destroy$ = new Subject<void>();

  constructor(private _httpClient: HttpClient) {
    this.initDatasource();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  /**
   * Get available carIds
   */
  public getCarIds(): Promise<string[]> {
    return new Promise(resolve => {
      this._datasourceLoaded$
        .pipe(
          takeUntil(this._destroy$),
          filter(isLoaded => isLoaded),
          take(1),
        ).subscribe(() => {
          // Simulate delay for server response
          setTimeout(() => resolve(Object.keys(this._datasource)), 1000);
        });
    });
  }

  /**
   * Provide telemetry updates as an Observable
   */
  public getTelemetryUpdates(carIds: string[]): Observable<Measurements> {
    return this._datasourceLoaded$
      .pipe(
        takeUntil(this._destroy$),
        filter(isLoaded => isLoaded),
        take(1),
        switchMap(() => {
          return interval(5000)
            .pipe(
              takeUntil(this._destroy$),
              map(index => this.fetchData(index, carIds)),
              takeWhile(measurements => Object.keys(measurements).length > 0)
            );
        })
      );
  }

  /**
   * Initialize the data source by fetching CSV
   */
  private initDatasource(): void {
    this._httpClient.get(this._csvPath, { responseType: 'text' })
      .subscribe(csvData => {
        const rows = csvData?.split('\n');
        // remove header row
        rows?.shift();

        const groupedDatasource = this.processRawDatasource(rows);
        this.sortGroupedDatasource(groupedDatasource);
        this._datasourceLoaded$.next(true);
      });
  }

  /**
   * Processes raw datasource rows
   */
  private processRawDatasource(rows: string[]): GroupedMeasurements {
    const startTime = new Date().getTime();
    console.log('%cstart processing raw datasource...', 'color: green');

    const groupedDatasource: GroupedMeasurements = {};
    rows?.forEach(row => {
      const [, rawTimestamp, pressure, position, temperature, omega, speed, carId] = row.split(',');
      if (carId) {
        const measurement: IMeasurement = {
          timestamp: new Date(rawTimestamp),
          pressure: parseFloat(pressure),
          position,
          // position: TyrePosition[position as keyof typeof TyrePosition],
          temperature: parseFloat(temperature),
          omega: parseFloat(omega),
          speed: parseFloat(speed),
          carId
        };

        groupedDatasource[carId] = groupedDatasource[carId] || {};
        groupedDatasource[carId][rawTimestamp] = groupedDatasource[carId][rawTimestamp] || [];
        groupedDatasource[carId][rawTimestamp].push(measurement);
      }
    });

    const endTime = new Date().getTime();
    console.log(`%cend processing raw datasource ${endTime - startTime}ms`, 'color: green');

    return groupedDatasource;
  }

  /**
   * Sorts the grouped datasource by timestamp for each carId
   */
  private sortGroupedDatasource(groupedDatasource: GroupedMeasurements): void {
    const startTime = new Date().getTime();
    console.log('%cstart sorting grouped datasource...', 'color: green');

    this._datasource = {};
    for (const carId in groupedDatasource) {
      const carMeasurements = groupedDatasource[carId];
      const measurements: IMeasurement[][] = [];
      for (const timestamp in carMeasurements) {
        measurements.push(carMeasurements[timestamp]);
      }
      measurements.sort((a, b) => a[0].timestamp.getTime() - b[0].timestamp.getTime());
      this._datasource[carId] = measurements;
    }

    const endTime = new Date().getTime();
    console.log(`%cend sorting grouped datasource ${endTime - startTime}ms`, 'color: green');
  }

  /**
   * Feath data
   */
  private fetchData(index: number, carIds: string[]): Measurements {
    const measurements: Measurements = {};

    carIds?.forEach(carId => {
      const carMeasurements = this._datasource[carId];
      const currentMeasurements = carMeasurements?.[index];
      if (currentMeasurements) {
        measurements[carId] = currentMeasurements.filter(m => m.pressure > 0 && m.omega > 0);
      }
    });

    return measurements;
  }

}
