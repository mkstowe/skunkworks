import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RGBA } from 'ngx-color';
import { Subject } from 'rxjs';
import { ColorPickerComponent } from '../../../../common/components/color-picker/color-picker.component';
import { HassEntity } from '../../models/Entity';
import { ServiceCall } from '../../models/ServiceCall';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-light-detail',
  imports: [CommonModule, ColorPickerComponent],
  templateUrl: './light-detail.component.html',
  styleUrl: './light-detail.component.scss',
})
export class LightDetailComponent implements OnInit {
  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity;
  public valueChangeSubject$ = new Subject<void>();
  public brightness = 0;
  private color: number[] = [];

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  constructor(
    private hassService: HassService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });

    this.brightness = (this.entity?.attributes['brightness'] as number) || 0;
  }

  public onColorChange(e: RGBA) {
    this.color = [e.r, e.g, e.b];
  }

  public applyColor() {
    const service: ServiceCall = {
      domain: 'light',
      service: 'turn_on',
      service_data: {
        rgb_color: this.color,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service).subscribe();
  }
}
