import { AfterViewInit, Component, ElementRef, Injector, Input, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import $ from 'jquery';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements AfterViewInit, OnDestroy {
  /**
   * Mode of the progress bar
   */
  @Input() public mode: ProgressSpinnerMode = 'determinate';
  /**
   * Value of the progress bar
   */
  @Input() public value: number = 0;
  /**
   * Spinner element ref
   */
  private _element: ElementRef<HTMLElement>;

  constructor(injector: Injector) {
    this._element = injector.get(ElementRef);
  }

  public ngAfterViewInit(): void {
    if (this.mode === 'indeterminate') {
      const spinner = $(this._element.nativeElement);
      spinner.addClass('spinner-overlay');
      $('body').append(spinner);
    }
  }

  public ngOnDestroy(): void {
    if (this.mode === 'indeterminate') {
      $(this._element.nativeElement).remove();
    }
  }

}
