import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import { PrinterDetails } from '../../services/printer.service';

@Component({
  selector: 'app-printer-detail',
  imports: [CommonModule, NgIcon, ReactiveFormsModule, FormsModule],
  templateUrl: './printer-detail.component.html',
  styleUrl: './printer-detail.component.scss',
})
export class PrinterDetailComponent implements OnInit {
  @Input() openModalSubject$!: Subject<void>;
  @Input() details!: PrinterDetails;

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
