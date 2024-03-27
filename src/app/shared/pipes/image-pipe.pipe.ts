import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe',
})
export class ImagePipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): any {
    if (value !== null) {
      return `https://image.tmdb.org/t/p/w500/${value}`;
    } else {
      return false;
    }
  }
}
