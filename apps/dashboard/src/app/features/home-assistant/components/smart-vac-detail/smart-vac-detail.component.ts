import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { VacuumDetails } from '../../services/smart-vac.service';

@Component({
  selector: 'app-smart-vac-detail',
  imports: [CommonModule],
  templateUrl: './smart-vac-detail.component.html',
  styleUrl: './smart-vac-detail.component.scss',
})
export class SmartVacDetailComponent implements OnInit {
  @Input() openModalSubject$!: Subject<void>;
  @Input() details!: VacuumDetails;

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
