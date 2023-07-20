import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endOfString',
})
export class EndOfStringPipe implements PipeTransform {
  transform(
    value: string | undefined,
    length: number,
    approx: number = 5
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= length - approx) {
      return value;
    }

    return '...' + value.slice(-length);
  }
}
