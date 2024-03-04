import { TemplateRef } from '@angular/core';
import { TableFooterColumnDirective } from './table-footer-column.directive';

describe('TableFooterColumnDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<any>;
    const directive = new TableFooterColumnDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
