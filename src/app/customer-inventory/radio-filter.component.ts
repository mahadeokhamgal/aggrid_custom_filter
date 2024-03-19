import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
 selector:'./radio-filter.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./radio-filter.Component.html',
})  
export class RadioFilter implements IFilterAngularComp {
  params!: IFilterParams;
  year = 'All';
  years:any[]=["2010","2013",'2019'];
    isFilterActiveBool: boolean =false;
  
  

  agInit(params: IFilterParams): void {
    this.params = params;
  }
 

  isFilterActive(): boolean {
    return this.year === this.year;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return params.data.year == this.year;
  }

  getModel() {}

  setModel(model: any) {}

  updateFilter() {
    this.params.filterChangedCallback();
  }
  filterStatusChange(){
    this.isFilterActiveBool= !this.isFilterActiveBool;
  }
}
