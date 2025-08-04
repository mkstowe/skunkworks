import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnChanges {
  @Input() value = 0; // number of dots to activate
  @Input() total = 20; // how many dots
  @Input() interactive = false;
  @Input() activeColor = 'bg-primary';
  @Input() inactiveColor = 'bg-neutral';
  @Input() dotSize = 'w-3 h-3'; // Tailwind classes for dot size
  @Input() gapSize = 'gap-1';
  @Output() valueChange = new EventEmitter<number>();

  dots: number[] = [];

  ngOnChanges(): void {
    this.dots = Array.from({ length: this.total }, (_, i) => i);
  }

  onDotClick(index: number): void {
    if (!this.interactive) return;
    this.value = index + 1;
    this.valueChange.emit(this.value / this.total); // as a percentage
  }
}
