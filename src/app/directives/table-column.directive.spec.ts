import { TemplateRef } from '@angular/core';
import { TableColumnDirective } from './table-column.directive';

describe('TableColumnDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<any>;
    const directive = new TableColumnDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
