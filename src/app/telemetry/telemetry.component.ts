import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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
   * Columns to be displayed in the table
   */
  public readonly displayedColumns: (keyof IMeasurement)[] = ['timestamp', 'carId', 'position', 'pressure', 'temperature', 'omega', 'speed'];
  /**
   * Indicates whether the component is currently loading data
   */
  public isLoading = false;
  /**
   * List of available car Ids
   */
  public carIds: string[] = [];
  /**
   * Selected car Ids
   */
  public selectedCarIds: string[] = [];
  /**
   * Telemetry measurements Observable
   */
  public telemetryMeasurements$!: Observable<IMeasurement[][]>;
  /**
   * Complete telemetry measurements grouped by carId
   */
  private _completeTelemetryMeasurements: { [carId: string]: IMeasurement[][] } = {};
  /**
   * 
   */
  private _telemetryMeasurements: IMeasurement[][] = [];

  constructor(private _telemetryService: TelemetryService) { }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.carIds = await this._telemetryService.getCarIds();
    this.isLoading = false;
  }

  /**
   * Handles the selection of cars from the dropdown
   */
  public onCarsSelected({ value }: MatSelectChange) {
    this.selectedCarIds = value;
    this._telemetryMeasurements = [];
    this._completeTelemetryMeasurements = {};
    this.telemetryMeasurements$ = this._telemetryService.getTelemetryUpdates(this.selectedCarIds)
      .pipe(
        map(data => {
          for (const carId in data) {
            const carMeasurements = data[carId];
            this._completeTelemetryMeasurements[carId] = this._completeTelemetryMeasurements[carId] || [];
            this._completeTelemetryMeasurements[carId].push(carMeasurements);
            this._telemetryMeasurements.push(carMeasurements);
          }
          return this._telemetryMeasurements;
        }
        ));
  }

}
