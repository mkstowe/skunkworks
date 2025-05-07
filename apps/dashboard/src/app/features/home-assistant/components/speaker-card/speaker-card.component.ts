import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { delay, Subject } from 'rxjs';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { HassService } from '../../services/hass.service';
import { SpeakerService } from '../../services/speaker.service';
import { SpeakerDetailComponent } from '../speaker-detail/speaker-detail.component';

@Component({
  selector: 'app-speaker-card',
  imports: [CommonModule, ProgressBarComponent, SpeakerDetailComponent, NgIcon],
  templateUrl: './speaker-card.component.html',
  styleUrl: './speaker-card.component.scss',
})
export class SpeakerCardComponent implements OnInit {
  private readonly hassService = inject(HassService);
  private readonly speakerService = inject(SpeakerService);

  @Input() entityId!: string;
  @Input() name?: string;
  @Input() icon?: string;
  public entity?: HassEntity;
  public volume: number | null = 15;
  public active = false;
  public playing = false;
  public openDetailSubject$ = new Subject<void>();
  public numDots = 20;
  public volumeProgress = 0;

  private onStates = ['on', 'idle', 'playing', 'paused'];

  public ngOnInit(): void {
    this.hassService.entities$.subscribe((res: any) => {
      this.entity = res[this.entityId];
      this.volume = +(
        this.entity?.attributes['volume_level'] as number
      )?.toFixed(2);
      this.volumeProgress = this.volume * this.numDots;
      this.active = this.hassService.isActive(this.entity);
      this.playing = this.entity?.state === 'playing';
    });
  }

  public toggleState() {
    this.speakerService
      .toggleState(this.entityId)
      .pipe(delay(1550))
      .subscribe();
  }

  public turnOn() {
    this.speakerService.turnOn(this.entityId).pipe(delay(1250)).subscribe();
  }

  public togglePlayback() {
    if (!this.active) {
      this.speakerService.turnOn(this.entityId).pipe(delay(1250)).subscribe();
    } else {
      this.speakerService
        .togglePlayback(this.entityId)
        .pipe(delay(1250))
        .subscribe();
    }
  }

  public nextTrack() {
    this.speakerService.nextTrack(this.entityId).subscribe();
  }

  public prevTrack() {
    this.speakerService.prevTrack(this.entityId).subscribe();
  }

  public onVolumeChange(value: number) {
    const vol = value;

    this.speakerService
      .changeVolume(this.entityId, vol)
      .pipe(delay(1250))
      .subscribe();
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
