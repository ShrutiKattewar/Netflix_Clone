import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
})
export class YearPipe implements PipeTransform {
  transform(value: any, ...args: number[]): unknown {
    const date = new Date(value);
    return date.getFullYear();
  }
}
