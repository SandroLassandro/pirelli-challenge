import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { IMeasurement, ITyrePosition } from '../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  /**
   * Path to the CSV file containing telemetry data
   */
  private readonly _csvPath = 'assets/data_measurements_finals.csv';
  /**
   * Subject used to emit telemetry data updates to subscribers
   */
  private readonly _telemetryUpdate$: Subject<IMeasurement[]> = new Subject<IMeasurement[]>();
  /**
   * Index of the current line being read from the CSV data source
   */
  private _currentLine = 0;
  /**
   * Datasource containing telemetry data parsed from the CSV file
   */
  private _datasource: string[] = [];

  constructor() {
    this.initDatasource()
      .then(() => this.simulateRealTimeUpdates());
  }

  /**
   * Provide telemetry updates as an Observable
   */
  public getTelemetryUpdates(): Observable<IMeasurement[]> {
    return this._telemetryUpdate$.asObservable();
  }

  /**
   * Initialize the data source by fetching CSV
   */
  private async initDatasource(): Promise<void> {
    const response = await fetch(this._csvPath);
    const csvData = await response.text();
    this._datasource = csvData.split('\n');

    // remove header line
    this._datasource.shift();
  }

  /**
   * Simulate real-time updates by reading data from CSV every 60 seconds
   */
  private simulateRealTimeUpdates(): void {
    interval(5000).subscribe(() => {
      const newData = this.fetchData();
      this._telemetryUpdate$.next(newData);
    });
  }

  /**
   * Feath data
   */
  private fetchData(): IMeasurement[] {
    const telemetryData = [];
    const lineToRead = 4;

    for (let i = 0; i < lineToRead; i++) {
      const lineIndex = this._currentLine + i;
      const line = this._datasource[lineIndex];
      if (line) {
        const values = line.split(',');
        const data: IMeasurement = {
          timeStamp: new Date(values[1]),
          pressure: parseFloat(values[2]),
          position: ITyrePosition[values[3] as keyof typeof ITyrePosition],
          temperature: parseFloat(values[4]),
          omega: parseFloat(values[5]),
          speed: parseFloat(values[6]),
          carId: values[7]
        };
        telemetryData.push(data);
      }
    }

    this._currentLine = (this._currentLine + lineToRead) >= this._datasource.length
      ? 0
      : this._currentLine + lineToRead;

    return telemetryData;
  }

}
