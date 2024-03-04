import { TemplateRef } from "@angular/core";

/**
 * Table column
 */
export interface ITableColumn<T> {
  /**
   * Column property name
   */
  name: Extract<keyof T, string>;
  /**
   * Caption to display as the column header
   */
  caption?: string;
  /**
   * Name of the custom column template
   */
  templateName?: string;
  /**
   * Reference to the custom column template
   */
  templateRef?: TemplateRef<any>;
  /**
   * Reference to the custom footer column template
   */
  templateFooterRef?: TemplateRef<any>;
  /**
   * Specifies whether the column is sortable
   */
  isSortable?: boolean;
  /**
   * Specifies whether the columns is sticky
   */
  isSticky?: boolean;
  /**
   * Flag to enable or disable column rowspan
   */
  enableRowspan?: boolean;
}