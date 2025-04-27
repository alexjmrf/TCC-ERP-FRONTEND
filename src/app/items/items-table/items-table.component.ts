import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-items-table',
  imports: [
    NgForOf
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {
  @Input() data: any[] = [];
}
