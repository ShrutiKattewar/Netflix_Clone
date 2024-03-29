import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imagePipe',
})
export class ImagePipePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown, ...args: unknown[]): any {
    if (value !== null) {
      return `https://image.tmdb.org/t/p/w500/${value}`;
    } else {
      return false;
    }
  }
}
