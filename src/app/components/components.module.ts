import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumnDirective } from '../directives/table-column.directive';
import { TableFooterColumnDirective } from '../directives/table-footer-column.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableComponent } from './table/table.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ThemePickerComponent,
    TableComponent,
    TableColumnDirective,
    TableFooterColumnDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    SpinnerComponent,
    ThemePickerComponent,
    TableComponent,
    TableColumnDirective,
    TableFooterColumnDirective
  ]
})
export class ComponentsModule { }
