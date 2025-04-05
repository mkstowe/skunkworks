import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit = 20,
    trail = '...',
    preserveWords = true
  ): string {
    if (!value) return '';

    if (value.length <= limit) return value;

    let truncated = value.slice(0, limit);

    // Smart word boundary handling
    if (preserveWords) {
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > 0) {
        truncated = truncated.slice(0, lastSpace);
      }
    }

    return `${truncated.trim()}${trail}`;
  }
}
