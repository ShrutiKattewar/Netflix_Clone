import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
})
export class LimitPipe implements PipeTransform {
  transform(value: string, ...args: number[]): unknown {
    const slicedArray = value.slice(0, 10);

    return slicedArray;
  }
}
