import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TelemetryService } from '../services/telemetry.service';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.scss'
})
export class TelemetryComponent implements OnInit {
  /**
   * Form control for selecting car Ids
   */
  public carIdsFormControl!: FormControl<string | null>;
  /**
   * List of available car Ids
   */
  public carIds!: string[];
  /**
   * Selected car Ids
   */
  public selectedCarIds!: string[];
  /**
   * Specifies whether the component is currently loading data
   */
  public isLoading = true;

  constructor(private _telemetryService: TelemetryService) { }

  public ngOnInit(): void {
    this.carIdsFormControl = new FormControl<string>('', Validators.required);
    this.setupCarIds();
  }

  /**
   * Setup car Ids
   */
  private async setupCarIds(): Promise<void> {
    try {
      this.carIds = await this._telemetryService.getCarIds();
    } catch (error) {
      console.error('Error fetching car Ids:', error);
    } finally {
      this.isLoading = false;
    }
  }

}
