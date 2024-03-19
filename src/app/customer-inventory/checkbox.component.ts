import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
 selector:'./checkbox.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./checkbox.Component.html',
})  
export class Checkbox implements IFilterAngularComp {
   years:any[]=[];
   
    selectedYears:{[key:string]:boolean}={};
    columnKey:string='';
    column:any;
  params!: IFilterParams;
    // isFilterActiveBool: any;
    // year = 'All';
  agInit(params: IFilterParams): void {
    this.params = params;
    this.columnKey=params.colDef.field!;
    this.years.forEach(year=>{
        this.selectedYears[year] = true;
    });
  }
  getAllRows() {
    let rowData: any[] = [];
    this.params.api.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  getCheckboxesForApi(){
    this.years=[];
     this.params.api.forEachNode(node => this.years.push(node.data.year));
     return this.years;
  }
  isFilterActive(): boolean {
    return Object.values(this.selectedYears).some(value =>value);
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const cellValue = params.data[this.columnKey]
    return this.selectedYears[cellValue];
  }

  getModel():any {
    return this.selectedYears;
  }

  setModel(model: any):void {
    this.selectedYears=model;
  }

  updateFilter() {
    this.params.filterChangedCallback();
    this.params.filterModifiedCallback();
    console.log('calling change');
    
  }
}
