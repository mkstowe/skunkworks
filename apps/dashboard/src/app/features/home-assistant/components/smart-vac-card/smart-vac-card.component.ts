import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
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
  private readonly vacService = inject(SmartVacService);

  @Input() vacuumName!: string;
  public details = signal<VacuumDetails | null>(null);
  public active = computed(() =>
    this.vacService.isActive(this.details()?.state)
  );
  public openDetailSubject$ = new Subject<void>();

  ngOnInit(): void {
    this.vacService.getVacuumDetails(this.vacuumName).subscribe((details) => {
      this.details.set(details);
    });
  }

  public startCleaning() {
    this.vacService.startCleaning(this.vacuumName);
  }

  public pauseCleaning() {
    this.vacService.pauseCleaning(this.vacuumName);
  }

  public toggleState() {
    if (this.details()?.state === 'cleaning') {
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
    this.openDetailSubject$.next();
  }

  // TODO: Start/Stop/Pause/Dock
  // TODO: Status
  // TODO: Remaining time
  // TODO: Battery
  // TODO: More - Map view
  // TODO: More - select room
}
