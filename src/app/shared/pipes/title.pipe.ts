import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: string, ...args: number[]): unknown {
    return `${value.substring(0, 35)}`;
  }
}
