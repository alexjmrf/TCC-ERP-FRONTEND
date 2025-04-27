import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-icon-btn',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './icon-btn.component.html',
  styleUrl: './icon-btn.component.scss'
})
export class IconBtnComponent {
  @Input() iconName!: string;
  @Input() buttonText!: string;
  @Input() width: string = '200px';
  @Input() height: string = '40px';
}
