import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableFooterColumn]'
})
export class TableFooterColumnDirective {
  /**
   * Table column template name
   */
  @Input('tableFooterColumn') public name!: string;

  constructor(public readonly templateRef: TemplateRef<any>) { }

}
