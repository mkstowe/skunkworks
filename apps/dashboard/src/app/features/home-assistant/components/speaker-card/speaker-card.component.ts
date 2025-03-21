import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { delay, Subject } from 'rxjs';
import { IconComponent } from '../../../../common/components/icon/icon.component';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassService } from '../../services/hass.service';
import { SpeakerService } from '../../services/speaker.service';
import { SpeakerDetailComponent } from '../speaker-detail/speaker-detail.component';

@Component({
  selector: 'app-speaker-card',
  imports: [
    CommonModule,
    IconComponent,
    ProgressBarComponent,
    SpeakerDetailComponent,
  ],
  templateUrl: './speaker-card.component.html',
  styleUrl: './speaker-card.component.scss',
})
export class SpeakerCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  @Input() size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  public entity?: HassEntity;
  public volume: number | null = null;
  public active = false;
  public valueChangeSubject$ = new Subject<void>();
  public openDetailSubject$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    private speakerService: SpeakerService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.volume = (this.entity?.attributes['volume'] as number) || 0;
      this.active = this.entity?.state === 'on';
    });
  }

  public toggleState() {
    this.speakerService
      .toggleState(this.entityId)
      .pipe(delay(1550))
      .subscribe(() => {
        this.valueChangeSubject$.next();
        this.cd.detectChanges();
      });
  }

  public togglePlayback() {
    this.speakerService.togglePlayback(this.entityId).subscribe(() => {
      this.valueChangeSubject$.next();
    });
  }

  public onVolumeChange(value: number) {
    // this.hassService
    //   .callService({
    //     domain: 'media_player',
    //     service: 'volume_set',
    //     service_data: {
    //       level: value,
    //     },
    //     target: {
    //       entity_id: this.entityId,
    //     },
    //   })
    //   .pipe(delay(1250))
    //   .subscribe(() => {
    //     this.volume = value;
    //     this.valueChangeSubject$.next();
    //     this.cd.detectChanges();
    //   });
  }

  public openDetail() {
    this.openDetailSubject$.next();
  }

  public valueAsPercentage(value: number) {
    // Min: 0
    // Max: 1
    return value * 100;
  }
}
