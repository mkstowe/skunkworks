import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import { colors } from '../../models/Colors';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit {
  @Input() name!: string;
  @Input() active = false;
  @Input() color?: colors = 'basic';
  @Input() colorActive?: colors = 'basic';
  @Input() fillActive?: colors = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() valueChangeSubject$!: Subject<void>;

  public sizeClass = 'text-lg';
  public colorClass = 'text-basic';
  public activeColorClass = 'fill-primary';
  public classes = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChangeSubject$.subscribe(() => {
      this.cdr.markForCheck();

      const color = this.color === 'basic' ? 'light' : this.color;
      const activeColor =
        this.colorActive === 'basic' ? 'dark' : this.colorActive;
      const activeFill =
        this.fillActive === 'basic' ? 'light' : this.fillActive;

      this.classes = `text-${this.size} text-${
        this.active ? activeColor : color
      } ${this.active ? 'fill-' + activeFill : ''}`;
    });
  }
}
