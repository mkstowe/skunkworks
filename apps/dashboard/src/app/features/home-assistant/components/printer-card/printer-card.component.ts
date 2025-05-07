import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import { AutoScrollDirective } from '../../../../common/directives/auto-scroll.directive';
import { FormatDurationPipe } from '../../../../common/pipes/formatDuration.pipe';
import { TruncatePipe } from '../../../../common/pipes/tuncate.pipe';
import { PrinterDetails, PrinterService } from '../../services/printer.service';
import { PrinterDetailComponent } from '../printer-detail/printer-detail.component';

@Component({
  selector: 'app-printer-card',
  imports: [
    CommonModule,
    PrinterDetailComponent,
    NgIcon,
    FormatDurationPipe,
    TruncatePipe,
    AutoScrollDirective,
  ],
  templateUrl: './printer-card.component.html',
  styleUrl: './printer-card.component.scss',
})
export class PrinterCardComponent implements OnInit {
  private readonly printerService = inject(PrinterService);

  @Input() entityId = 'sensor.bambu_print_status';
  public active = false;
  public details: PrinterDetails = {};
  public openDetailSubject$ = new Subject<void>();
  public elapsedTime = 0;

  ngOnInit(): void {
    this.printerService.getPrinterDetails().subscribe((res: PrinterDetails) => {
      this.details = res;
      this.active = this.printerService.isActive(this.details.printStatus);
      if (this.details.startTime) {
        this.elapsedTime =
          Date.now() - new Date(this.details.startTime).getTime();
      }
    });
  }

  public toggleState() {
    if (!this.active) return;
    if (this.details.printStatus === 'running') {
      this.printerService.pausePrint();
    } else {
      this.printerService.resumePrint();
    }
  }

  public stopPrint() {
    this.printerService.stopPrint();
  }

  public openDetail() {
    this.openDetailSubject$.next();
  }
}
