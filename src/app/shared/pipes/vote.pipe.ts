import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vote',
})
export class VotePipe implements PipeTransform {
  transform(value: any, ...args: number[]): unknown {
    if (value !== 0) {
      return `${Math.floor(value * 10)}% Match`;
    } else {
      return `${Math.floor(Math.random() * 100)}% Match`;
    }
  }
}
