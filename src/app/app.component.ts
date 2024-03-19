import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerInventoryComponent } from "./customer-inventory/customer-inventory.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [RouterOutlet, CustomerInventoryComponent]
})
export class AppComponent {
  title = 'customFilter';
}
