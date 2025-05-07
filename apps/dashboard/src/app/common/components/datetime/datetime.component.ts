import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  imports: [CommonModule],
  templateUrl: './datetime.component.html',
  styleUrl: './datetime.component.scss',
})
export class DatetimeComponent implements OnInit, OnDestroy {
  public currentTime = new Date();
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
