import {
  Component,
  Input,
  output,
  OutputEmitterRef,
  ViewEncapsulation,
} from '@angular/core';
import { ColorEvent, RGBA } from 'ngx-color';
import { ColorBlockModule } from 'ngx-color/block';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorCircleModule } from 'ngx-color/circle';
@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  imports: [ColorBlockModule, ColorChromeModule, ColorCircleModule],
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent {
  @Input() colors = ['#FFD8A8', '#D9E2F1', '#7AAFFF', '#FF9F43', '#C678DD'];
  @Input() default = this.colors[0];
  colorChange: OutputEmitterRef<RGBA> = output();

  public currentColor: string = this.default;

  public onColorChange(e: ColorEvent) {
    this.currentColor = e.color.hex;
    this.colorChange.emit(e.color.rgb);
  }
}
