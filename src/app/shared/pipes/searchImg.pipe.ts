import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchImgPipe',
})
export class SearchImgPipe implements PipeTransform {
  transform(evalue: any, ...args: unknown[]): any {
    let filteredArray: any;
    filteredArray = evalue.filter((item: any) => item.poster_path !== null);

    return filteredArray;
  }
}
