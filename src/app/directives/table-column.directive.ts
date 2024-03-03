import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumn]'
})
export class TableColumnDirective {
  /**
   * Table column template name
   */
  @Input('tableColumn') public name!: string;

  constructor(public readonly templateRef: TemplateRef<any>) { }

}
