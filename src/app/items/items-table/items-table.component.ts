import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-items-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {
  @Input() data: any[] = [];
}
