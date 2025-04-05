import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
  standalone: true,
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: number | null | undefined, format = 'HH MM SS'): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    const totalSeconds = Math.floor(value / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const values: Record<string, number> = {
      HH: hours,
      H: hours,
      MM: minutes,
      M: minutes,
      SS: seconds,
      S: seconds,
    };

    const suffixes: Record<string, string> = {
      HH: 'h',
      H: 'h',
      MM: 'm',
      M: 'm',
      SS: 's',
      S: 's',
    };

    // Replace tokens with actual values
    const result = format.replace(/HH|H|MM|M|SS|S/g, (match) => {
      const val = values[match];
      if (val === 0) return '';
      const valueStr =
        match.length === 2 ? String(val).padStart(2, '0') : String(val);
      return `${valueStr}${suffixes[match]}`;
    });

    return result.replace(/\s+/g, ' ').trim() || '0s';
  }
}
