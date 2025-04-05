import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subject } from 'rxjs';
import {
  SmartVacService,
  VacuumDetails,
} from '../../services/smart-vac.service';
import { SmartVacDetailComponent } from '../smart-vac-detail/smart-vac-detail.component';

@Component({
  selector: 'app-smart-vac-card',
  imports: [CommonModule, NgIcon, SmartVacDetailComponent],
  templateUrl: './smart-vac-card.component.html',
  styleUrl: './smart-vac-card.component.scss',
})
export class SmartVacCardComponent implements OnInit {
  @Input() vacuumName!: string;
  public active = false;
  public details: VacuumDetails = {};
  public openDetailSubject$ = new Subject<void>();

  constructor(private vacService: SmartVacService) {}

  ngOnInit(): void {
    this.vacService.getVacuumDetails(this.vacuumName).subscribe((details) => {
      this.details = details;
      this.active = this.vacService.isActive(this.details.state);
    });
  }

  public startCleaning() {
    this.vacService.startCleaning(this.vacuumName);
  }

  public pauseCleaning() {
    this.vacService.pauseCleaning(this.vacuumName);
  }

  public toggleState() {
    if (this.details.state === 'cleaning') {
      this.pauseCleaning();
    } else {
      this.startCleaning();
    }
  }

  public stopCleaning() {
    this.vacService.stopCleaning(this.vacuumName);
  }

  public dockVacuum() {
    this.vacService.dock(this.vacuumName);
  }

  public locateVacuum() {
    this.vacService.locate(this.vacuumName);
  }

  public openDetail() {
    return;
  }

  // TODO: Start/Stop/Pause/Dock
  // TODO: Status
  // TODO: Remaining time
  // TODO: Battery
  // TODO: More - Map view
  // TODO: More - select room
}
