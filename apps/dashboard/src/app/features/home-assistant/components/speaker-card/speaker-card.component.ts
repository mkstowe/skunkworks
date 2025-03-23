import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { delay, Subject, switchMap } from 'rxjs';
import { IconComponent } from '../../../../common/components/icon/icon.component';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassService } from '../../services/hass.service';
import { SpeakerService } from '../../services/speaker.service';
import { SpeakerDetailComponent } from '../speaker-detail/speaker-detail.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSliders } from '@ng-icons/phosphor-icons/regular';
import {
  phosphorPause,
  phosphorSkipForward,
  phosphorPlay,
  phosphorSkipBack,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-speaker-card',
  imports: [CommonModule, ProgressBarComponent, SpeakerDetailComponent, NgIcon],
  templateUrl: './speaker-card.component.html',
  styleUrl: './speaker-card.component.scss',
  providers: [
    provideIcons({
      phosphorSliders,
      phosphorPause,
      phosphorSkipBack,
      phosphorSkipForward,
      phosphorPlay,
    }),
  ],
})
export class SpeakerCardComponent implements OnInit {
  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  @Input() size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  public entity?: HassEntity;
  public volume: number | null = null;
  public active = false;
  public playing = false;
  public valueChangeSubject$ = new Subject<void>();
  public openDetailSubject$ = new Subject<void>();

  private onStates = ['on', 'idle', 'playing', 'paused'];

  constructor(
    private hassService: HassService,
    private speakerService: SpeakerService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.volume =
        +(this.entity?.attributes['volume_level'] as number)?.toFixed(2) || 0;
      this.active = this.onStates.includes(this.entity?.state || '');
      this.playing = this.entity?.state === 'playing';
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

  public turnOn() {
    this.speakerService.turnOn(this.entityId).subscribe(() => {
      this.valueChangeSubject$.next();
    });
  }

  public togglePlayback() {
    if (!this.active) {
      this.speakerService.turnOn(this.entityId).pipe(delay(1250)).subscribe();
    } else {
      this.speakerService
        .togglePlayback(this.entityId)
        .pipe(delay(1250))
        .subscribe(() => {
          this.valueChangeSubject$.next();
        });
    }
  }

  public nextTrack() {
    this.speakerService
      .nextTrack(this.entityId)
      .subscribe(() => this.valueChangeSubject$.next());
  }

  public prevTrack() {
    this.speakerService
      .prevTrack(this.entityId)
      .subscribe(() => this.valueChangeSubject$.next());
  }

  public onVolumeChange(value: number) {
    const vol = value / 100;

    this.speakerService
      .changeVolume(this.entityId, vol)
      .pipe(delay(1250))
      .subscribe(() => {
        this.volume = vol;
        this.valueChangeSubject$.next();
        this.cd.detectChanges();
      });
  }

  public openDetail() {
    this.openDetailSubject$.next();
  }

  public valueAsPercentage(value: number) {
    // Min: 0
    // Max: 1
    return value * 100;
  }

  // TODO: Track info
  // TODO: Source speaker
  // TODO: Prev/Next
  // TODO: More - Shuffle
  // TODO: More - Playlist select
  // TODO: More - Seek bar
}
