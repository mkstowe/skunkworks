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
  @Input() color: RGBA = this.hexToRgb(this.colors[0])!;
  colorChange: OutputEmitterRef<RGBA> = output();

  public onColorChange(e: ColorEvent) {
    this.color = e.color.rgb;
    this.colorChange.emit(e.color.rgb);
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? ({
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        } as RGBA)
      : null;
  }

  private rgbToHex(r: number, g: number, b: number) {
    return (
      '#' +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  private componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
}
