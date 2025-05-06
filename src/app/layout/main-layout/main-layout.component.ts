import { Component } from '@angular/core';
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SideMenuComponent,
    TopBarComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {


}
