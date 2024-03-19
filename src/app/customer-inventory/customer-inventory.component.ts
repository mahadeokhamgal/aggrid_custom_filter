import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Component } from '@angular/core';
import { FormsModule, RadioControlValueAccessor } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { getData } from './data';
import { PartialMatchFilter } from './partial-match-filter.component';
import { RadioFilter } from './radio-filter.component';
import { Checkbox } from './checkbox.component';
import { Checkbox_gen } from './checkbox_gen.component';



@Component({
  selector: 'app-customer-inventory',
  standalone: true,
  imports: [AgGridAngular, FormsModule, PartialMatchFilter,RadioFilter,Checkbox,Checkbox_gen],
  templateUrl: './customer-inventory.component.html',
  styleUrl: './customer-inventory.component.less'
})
export class CustomerInventoryComponent {

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "",
    //filter: Checkbox_gen,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        cellEditor: 'agCheckboxCellEditor',
        
        
        //cellRenderer: 'agCheckboxCellRenderer',
  },
    { field: 'year',
    filter: Checkbox_gen,
      //cellRenderer: 'agCheckboxCellRenderer',
        //cellEditor: 'agCheckboxCellEditor'
    
  },
    {
      field: 'name',
      filter: Checkbox_gen,
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };
  public rowData: any[] | null = getData();
  public themeClass: string =
    "ag-theme-quartz";
frameworkComponents: any;

  onClicked() {
    this.gridApi
      .getColumnFilterInstance<PartialMatchFilter>('year')
      .then((instance) => {
        instance!.componentMethod('Hello World!');
      });
  }
  public rowSelection: 'single' | 'multiple' = 'multiple';
  

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}