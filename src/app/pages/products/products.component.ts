import { Component } from '@angular/core';
import {SearchBarComponent} from "../../items/search-bar/search-bar.component";
import {IconBtnComponent} from '../../items/icon-btn/icon-btn.component';
import {ItemsTableComponent} from '../../items/items-table/items-table.component';

@Component({
  selector: 'app-products',
  imports: [
    SearchBarComponent,
    IconBtnComponent,
    ItemsTableComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
