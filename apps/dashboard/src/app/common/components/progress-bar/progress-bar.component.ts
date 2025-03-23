import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { colors } from '../../models/Colors';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() step = 5;
  @Input() color: colors = 'accent';
  @Input() dotSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xl';
  @Input() dotSpacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() update$ = new Subject<void>();
  public textColorClass = 'text-' + this.color;

  @Output() valueChange = new EventEmitter<number>();
  public nextVal = 0;

  public dots: number[] = [];
  public dotPixels = 0;
  public dotGap = '0';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dots = Array.from(
      { length: Math.floor(this.max / this.step) },
      (_, i) => i * this.step + this.step
    );
    switch (this.dotSize) {
      case 'xs':
        this.dotPixels = 6;
        break;
      case 'sm':
        this.dotPixels = 10;
        break;
      case 'md':
        this.dotPixels = 12;
        break;
      case 'lg':
        this.dotPixels = 16;
        break;
      case 'xl':
        this.dotPixels = 18;
        break;
    }

    switch (this.dotSpacing) {
      case 'xs':
        this.dotGap = '0.1rem';
        break;
      case 'sm':
        this.dotGap = '0.25rem';
        break;
      case 'md':
        this.dotGap = '0.75rem';
        break;
      case 'lg':
        this.dotGap = '1rem';
        break;
      case 'xl':
        this.dotGap = '1.5rem';
        break;
    }

    this.textColorClass = 'text-' + this.color;

    this.nextVal = this.valueAsPercentage(this.value);
    this.update$.subscribe(() => {
      this.nextVal = this.valueAsPercentage(this.value);
    });
  }

  public onDotClick(value: number) {
    this.nextVal = this.valueAsPercentage(value);
    this.valueChange.emit(value);
  }

  public valueAsPercentage(value: number) {
    return Math.round((value / this.max) * 100);
  }
}
