import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from '../components/components.module';
import { FullTelemetryComponent } from './components/full-telemetry/full-telemetry.component';
import { LatestTelemetryComponent } from './components/latest-telemetry/latest-telemetry.component';
import { TelemetryRoutingModule } from './telemetry-routing.module';
import { TelemetryComponent } from './telemetry.component';

@NgModule({
  declarations: [
    TelemetryComponent,
    FullTelemetryComponent,
    LatestTelemetryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,
    TelemetryRoutingModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule
  ]
})
export class TelemetryModule { }
