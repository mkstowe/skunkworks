import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { HassEntity } from '../../models/Entity';
import { ThermostatService } from '../../services/thermostat.service';

@Component({
  selector: 'app-thermostat-detail',
  imports: [CommonModule],
  templateUrl: './thermostat-detail.component.html',
  styleUrl: './thermostat-detail.component.scss',
})
export class ThermostatDetailComponent implements OnInit {
  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity;
  public valueChangeSubject$ = new Subject<void>();

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  constructor(private thermostatService: ThermostatService) {}

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
