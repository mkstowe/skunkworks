import {
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RGBA } from 'ngx-color';
import { Subject } from 'rxjs';
import { ColorPickerComponent } from '../../../../common/components/color-picker/color-picker.component';
import { HassEntity } from '../../models/Entity';
import { HassService } from '../../services/hass.service';

@Component({
  selector: 'app-light-detail',
  imports: [ColorPickerComponent],
  templateUrl: './light-detail.component.html',
  styleUrls: ['./light-detail.component.scss'],
})
export class LightDetailComponent implements OnInit {
  private readonly hass = inject(HassService);

  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity | null;

  @ViewChild('modal', { static: true }) modal!: ElementRef<HTMLDialogElement>;

  public entitySignal = signal<HassEntity | null>(null);

  public color = computed(() => {
    const c = (this.entitySignal()?.attributes['rgb_color'] as number[]) ?? [
      255, 255, 255,
    ];
    return { r: c[0], g: c[1], b: c[2], a: 255 };
  });

  ngOnInit() {
    this.entitySignal.set(this.entity);

    this.openModalSubject$.subscribe(() => {
      this.openModal();
    });
  }

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }

  onColorChange(newColor: RGBA) {
    // this.color.set(newColor)
  }

  private _pendingColor: string | null = null;

  applyColor() {
    const currentEntity = this.entitySignal();
    if (!currentEntity || !this._pendingColor) return;

    // Convert "rgb(r,g,b)" to [r,g,b]
    const rgbMatch = this._pendingColor.match(/\d+/g);
    const rgb = rgbMatch
      ? rgbMatch.map((n) => parseInt(n, 10))
      : [255, 255, 255];

    this.hass
      .callService({
        domain: 'light',
        service: 'turn_on',
        target: { entity_id: currentEntity.entity_id },
        service_data: {
          rgb_color: rgb,
        },
      })
      .subscribe(() => {
        this._pendingColor = null;
        this.closeModal();
      });
  }
}
