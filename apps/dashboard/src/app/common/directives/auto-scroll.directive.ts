import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appScrollingText]',
})
export class AutoScrollDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appScrollingText') text = '';
  @Input() speed = 50; // milliseconds
  private intervalId: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.startScrolling();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.stopScrolling();
      this.startScrolling();
    }
  }

  ngOnDestroy() {
    this.stopScrolling();
  }

  startScrolling() {
    this.el.nativeElement.textContent = this.text;
    let currentPosition = 0;
    this.intervalId = setInterval(() => {
      currentPosition++;
      this.el.nativeElement.style.textIndent = `-${currentPosition}px`;
      if (currentPosition > this.el.nativeElement.offsetWidth) {
        currentPosition = 0;
      }
    }, this.speed);
  }

  stopScrolling() {
    clearInterval(this.intervalId);
  }
}
