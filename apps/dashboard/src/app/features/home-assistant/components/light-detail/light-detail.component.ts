import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RGBA } from 'ngx-color';
import { Subject } from 'rxjs';
import { ColorPickerComponent } from '../../../../common/components/color-picker/color-picker.component';
import { HassEntity } from '../../models/Entity';
import { LightService } from '../../services/light.service';

@Component({
  selector: 'app-light-detail',
  imports: [CommonModule, ColorPickerComponent],
  templateUrl: './light-detail.component.html',
  styleUrl: './light-detail.component.scss',
})
export class LightDetailComponent implements OnInit, OnChanges {
  private readonly lightService = inject(LightService);

  @Input() openModalSubject$!: Subject<void>;
  @Input() entity!: HassEntity;
  public valueChangeSubject$ = new Subject<void>();
  public brightness = 0;
  public color!: RGBA;

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.openModalSubject$.subscribe(() => {
      this.modal.nativeElement.showModal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && this.entity) {
      this.brightness = (this.entity?.attributes['brightness'] as number) ?? 0;

      const c = (this.entity?.attributes['rgb_color'] as number[]) ?? [
        255, 255, 255,
      ];
      this.color = { r: c[0], g: c[1], b: c[2], a: 255 };
    }
  }

  public onColorChange(e: RGBA) {
    this.color = e;
  }

  public applyColor() {
    this.lightService
      .changeColor(this.entity.entity_id, this.color)
      .subscribe();
  }

  // TODO: Effects
  // TODO: Transition time
}
