import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circular-slider',
  imports: [CommonModule],
  templateUrl: './circular-slider.component.html',
  styleUrl: './circular-slider.component.scss',
})
export class CircularSliderComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 20;
  @Input() openingPercent = 0.25;

  @Output() valueChange = new EventEmitter<number>();

  private ctx!: CanvasRenderingContext2D;
  private radius = 90;
  private isDragging = false;

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.draw();
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.updateValueFromPosition(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      event.preventDefault();
      this.updateValueFromPosition(event);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  updateValueFromPosition(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const arcThickness = 12; // or match your actual ctx.lineWidth
    const radius = this.radius;

    const buffer = 15;
    const innerRadius = radius - arcThickness / 2 - buffer;
    const outerRadius = radius + arcThickness / 2 + buffer;

    // ✅ Reject clicks outside the slider ring
    // if (distance < innerRadius || distance > outerRadius) return;

    // ⬇️ Continue with angle + value calculation
    let angleDeg = Math.atan2(y, x) * (180 / Math.PI);
    if (angleDeg < 0) angleDeg += 360;

    const openingDeg = 360 * this.openingPercent;
    const arcStartDeg = 90 + openingDeg / 2;
    const arcEndDeg = 180 - openingDeg / 2 + 360;
    const arcTotalDeg = arcEndDeg - arcStartDeg;

    const adjustedDeg = angleDeg < arcStartDeg ? angleDeg + 360 : angleDeg;

    if (adjustedDeg < arcStartDeg || adjustedDeg > arcEndDeg) return;

    const percentage = (adjustedDeg - arcStartDeg) / arcTotalDeg;
    const newValue = this.min + percentage * (this.max - this.min);

    if (Math.round(newValue) !== this.value) {
      this.value = Math.round(newValue);
      this.valueChange.emit(this.value);
      this.draw();
    }
  }

  degToRad(val: number) {
    return (val * Math.PI) / 180;
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    const width = canvas.width;
    const height = canvas.height;
    const center = { x: width / 2, y: height / 2 };
    const startAngle = 90 + 360 * (this.openingPercent / 2);
    const maxAngle = startAngle + 360 * (1 - this.openingPercent);

    ctx.clearRect(0, 0, width, height);

    // Background arc
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 12;
    ctx.arc(
      center.x,
      center.y,
      this.radius,
      this.degToRad(startAngle),
      this.degToRad(maxAngle)
    );
    ctx.stroke();

    // Foreground arc (value arc)
    const percentage = (this.value - this.min) / (this.max - this.min);
    const endAngle = Math.min(startAngle + 360 * percentage, maxAngle);

    ctx.beginPath();
    ctx.strokeStyle = '#ff7b3a';
    ctx.lineWidth = 12;
    ctx.arc(
      center.x,
      center.y,
      this.radius,
      this.degToRad(startAngle),
      this.degToRad(endAngle)
    );
    ctx.stroke();

    // Knob
    const knobX = center.x + this.radius * Math.cos(this.degToRad(endAngle));
    const knobY = center.y + this.radius * Math.sin(this.degToRad(endAngle));
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#ff7b3a';
    ctx.lineWidth = 3;
    ctx.arc(knobX, knobY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  increment() {
    this.value = Math.min(this.value + 1, this.max);
    this.valueChange.emit(this.value);
    this.draw();
  }

  decrement() {
    this.value = Math.max(this.value - 1, this.min);
    this.valueChange.emit(this.value);
    this.draw();
  }
}
