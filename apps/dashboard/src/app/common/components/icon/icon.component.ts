import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { colors } from '../../models/Colors';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit {
  @Input() name!: string;
  @Input() active = true;
  @Input() color?: colors = 'basic';
  @Input() colorActive?: colors = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  public svg?: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: IconService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const path = this.name + '.svg';
    this.iconService.getIcon(path).subscribe((icon: string) => {
      this.svg = this.sanitizer.bypassSecurityTrustHtml(icon);
      this.cdr.markForCheck();
    });
  }
}
