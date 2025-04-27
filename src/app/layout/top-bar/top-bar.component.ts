import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SearchBarComponent} from '../../items/search-bar/search-bar.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SearchBarComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
