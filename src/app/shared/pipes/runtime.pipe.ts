import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime',
})
export class RuntimePipe implements PipeTransform {
  transform(value: any, ...args: number[]): unknown {
    return `${(value / 60).toFixed(1)}hr`;
  }
}
