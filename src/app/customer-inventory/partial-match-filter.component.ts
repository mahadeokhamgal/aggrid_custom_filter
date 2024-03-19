import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilterAngularComp } from 'ag-grid-angular';
import {
  IAfterGuiAttachedParams,
  IDoesFilterPassParams,
  IFilterParams,
} from 'ag-grid-community';

@Component({
    selector:'./partial-match-filter.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./partial-match-filter.component.html',
  styles: [
    `
      .container {
        border-radius: 5px;
        width: 200px;
        height: 50px;
        padding: 10px;
      }

      input {
        height: 20px;
      }
    `,
  ],
})
export class PartialMatchFilter implements IFilterAngularComp {
  private filterParams!: IFilterParams;
  public text = '';

  @ViewChild('input', { read: ViewContainerRef })
  public input!: ViewContainerRef;

  agInit(params: IFilterParams): void {
    this.filterParams = params;
  }

  isFilterActive(): boolean {
    return this.text != null && this.text !== '';
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const { node } = params;
    const value = this.filterParams.getValue(node).toString().toLowerCase();

    return this.text
      .toLowerCase()
      .split(' ')
      .every((filterWord) => value.indexOf(filterWord) >= 0);
  }

  getModel(): any {
    if (!this.isFilterActive()) {
      return null;
    }

    return { value: this.text };
  }

  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

  afterGuiAttached(params: IAfterGuiAttachedParams): void {
    window.setTimeout(() => this.input.element.nativeElement.focus());
  }

  componentMethod(message: string): void {
    alert(`Alert from PartialMatchFilterComponent: ${message}`);
  }

  onChange(newValue: any): void {
    if (this.text !== newValue) {
      this.text = newValue;
      this.filterParams.filterChangedCallback();
    }
  }
}