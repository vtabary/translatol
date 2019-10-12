import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btoa'
})
export class BtoaPipe implements PipeTransform {

  transform(value: string): string {
    return btoa(value);
  }

}
