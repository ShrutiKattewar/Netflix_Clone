import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rumtime',
})
export class RumtimePipe implements PipeTransform {
  transform(value: any, ...args: number[]): unknown {
    return `${(value / 60).toFixed(1)}hr`;
  }
}
