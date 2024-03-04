import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from '../components/components.module';
import { TelemetryRoutingModule } from './telemetry-routing.module';
import { TelemetryComponent } from './telemetry.component';

@NgModule({
  declarations: [
    TelemetryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TelemetryRoutingModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class TelemetryModule { }
