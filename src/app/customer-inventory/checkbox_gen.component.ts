import { Component, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
 selector:'./heckbox_gen.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./checkbox_gen.Component.html',
})  
export class Checkbox_gen implements IFilterAngularComp {
   values:any[]=[];
    selectedValues:{[key:string]:boolean}={};
    columnKey : string= '';
    column:any;
  params!: IFilterParams;
    selectAll!: boolean;
    columnName: string = "";
  fValue: any;
  searchText:string = "";
    
  agInit(params: IFilterParams): void {
    this.params = params;
    this.columnKey=params.colDef.field!;
    //this.columnName=params.colDef.headerName;
    this.values=this.getDistinctColumnValues();
    this.values.forEach(value => {
        this.selectedValues[value] = false;
    });
  }
  getDistinctColumnValues():any[]{
  const values:any[]=[];
  this.params.api.forEachNode(node => {
    const value = node.data[this.columnKey];
    if(!values.includes(value)){
        values.push(value);
    }
  });
    return values;
  }

  isFilterActive(): boolean {
    return Object.values(this.selectedValues).some(value =>value);
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const cellValue = params.data[this.columnKey]
    return this.selectedValues[cellValue];
  }

  getModel():any {
    return this.selectedValues;
  }

  setModel(model: any):void {
    this.selectedValues=model;
  }
//method for update the filter
  updateFilter():void {
    this.params.filterChangedCallback();
    this.params.filterModifiedCallback();
    console.log('calling change');
    
  }
  toggleSelectAll():void{
    //Toggle SelectAll data
    //this.selectAll=!this.selectAll;
    //update selectedValues base on select All
    this.values.forEach(value =>{
        this.selectedValues[value]=this.selectAll;
    });
    //Update filter
    //this.updateFilter();
  }
  //filter data count
  getfilteredDataCount():number{
    let count=0;
    Object.keys(this.selectedValues).forEach(key =>{
        if(this.selectedValues[key]){
            //increment count for each selected value
            count++;
        }
    });
    return count;
  }
  //logic for buttons
  applyFilter():void{
    this.updateFilter();
    this.params.api.hidePopupMenu();
  }
  clearFilter():void{
    this.selectedValues={};//clear the selected values
    this.selectAll=false; //unselect the select/deselect all checkbox
    this.updateFilter(); //call the update filter method
    this.params.api.hidePopupMenu();
  }
  // filterValue():void{
  //   this.fValue=this.values.filter(value =>
  //     value.toLowerCase().includes(this.searchText.trim().toLowerCase())
  //     );
  // }
}
