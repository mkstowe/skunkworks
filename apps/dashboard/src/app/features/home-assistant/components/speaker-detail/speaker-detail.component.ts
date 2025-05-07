import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HassEntity } from '../../models/Entity';

@Component({
  selector: 'app-speaker-detail',
  imports: [CommonModule],
  templateUrl: './speaker-detail.component.html',
  styleUrl: './speaker-detail.component.scss',
})
export class SpeakerDetailComponent implements OnInit {
  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity;

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
