import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SearchBarComponent} from '../../items/search-bar/search-bar.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../auth.service';

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
  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
