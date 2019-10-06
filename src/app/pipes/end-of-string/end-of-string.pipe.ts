import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endOfString'
})
export class EndOfStringPipe implements PipeTransform {

  transform(value: string, length: number, approx: number = 5): any {
    if (value.length <= length - approx) {
      return value;
    }

    return '...' + value.slice(-length);
  }

}
