import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { HassEntity } from '../../models/Entity';
import { SpeakerService } from '../../services/speaker.service';

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

  constructor(private speakerService: SpeakerService) {}

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
