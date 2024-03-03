import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { TableColumnDirective } from '../directives/table-column.directive';
import { ITableColumn } from '../models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  /**
   * Data to be displayed
   */
  @Input() public data!: T[] | Observable<T[]>;
  /**
   * Columns definition
   */
  @Input() public columns!: ITableColumn<T>[];
  /**
   * Number of items to display on a page
   */
  @Input() public pageSize!: number;
  /**
   * Custom column templates
   */
  @ContentChildren(TableColumnDirective) public tableColumnsTemplateRef!: QueryList<TableColumnDirective>;
  /**
   * Table data source
   */
  public dataSource!: MatTableDataSource<T>;
  /**
   * Columns to be displayed
   */
  public displayedColumns: string[] = [];
  /**
   * Row spans for cells with consecutive identical values
   */
  public rowSpans!: { [columnName: string]: number }[];
  /**
   * MatTable reference
   */
  @ViewChild(MatTable) private _table!: MatTable<T>;
  /**
   * MatSort reference
   */
  @ViewChild(MatSort) private _sort!: MatSort;
  /**
   * MatPaginator reference
   */
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;
  /**
   * Rendered data which is filtered, sorted and paginated
   */
  private _renderData!: T[];
  /**
   * Subscriptions to be cleared
   */
  private _subscriptions: Subscription[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.displayedColumns = this.columns?.map(column => column?.name);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setupDataSource();
    }
  }

  public ngAfterContentInit(): void {
    this.setupCustomColumns();
  }

  public ngAfterViewInit(): void {
    this.setupSortingAndPagination();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  /**
   * Setup data source
   */
  private setupDataSource(): void {
    this.clearSubscriptions();
    this.dataSource = new MatTableDataSource();

    if (this.data instanceof Observable) {
      this._subscriptions.push(
        this.data.subscribe(newData => this.updateDataSource(newData))
      );
    } else {
      this.updateDataSource(this.data);
    }

    this.setupSortingAndPagination();

    this._subscriptions.push(
      this.dataSource.connect().subscribe(data => this._renderData = data)
    );
  }

  /**
   * Setup custom column templates
   */
  private setupCustomColumns() {
    this.tableColumnsTemplateRef
      ?.forEach(template => {
        this.columns
          ?.filter(col => col?.templateName === template.name && !col.templateRef)
          .forEach(column => column.templateRef = template.templateRef);
      });
  }

  /**
   * Setup sorting and pagination
   */
  private setupSortingAndPagination() {
    if (this.dataSource) {
      if (this._sort) {
        this.dataSource.sort = this._sort;
        this._subscriptions.push(
          this._sort.sortChange.subscribe(() => this.calculateRowSpan())
        );
      }

      if (this._paginator) {
        this.dataSource.paginator = this._paginator;
        this._subscriptions.push(
          this._paginator.page.subscribe(() => this.calculateRowSpan())
        );
      }
    }
  }

  /**
   * Clear subscriptions
   */
  private clearSubscriptions() {
    this._subscriptions.forEach(subscription => subscription?.unsubscribe());
    this._subscriptions = [];
  }

  /**
   * Update the data source with new data
   */
  private updateDataSource(data: T[]) {
    this.dataSource.data = data;
    this.calculateRowSpan();
    this._table?.renderRows();
  }

  /**
   * Calculate cell row span for consecutive identical values
   */
  private calculateRowSpan() {
    const columns = this.columns.filter(column => column.enableRowspan);
    this.rowSpans = [];

    columns.forEach(column => {
      const columnName = column.name;
      for (let i = 0; i < this._renderData.length; i++) {
        const row = this._renderData[i];
        let prevValue = row[columnName];
        let count = 1;

        for (let j = i + 1; j < this._renderData.length; j++) {
          if (_.isEqual(prevValue, this._renderData[j][columnName])) {
            count++;
          } else {
            // If the value changes, break the loop
            break;
          }
        }

        this.rowSpans[i] = this.rowSpans[i] ?? {};
        this.rowSpans[i][columnName] = count;

        // Skip rows that have already been counted
        i += count - 1;
      }
    });
  }

}
