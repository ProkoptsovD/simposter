import { Pipe, PipeTransform } from '@angular/core';
import { SortOrder } from '../enums/sortOrder.enum';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(arr: any[], property: string, order: string): any {
    if(arr.length < 2) return arr;

    const copyArr = [...arr];
    let sorted = [];

    switch(order) {
      case SortOrder.ascending:
        sorted = copyArr.sort((a, b) => {
          const isString = typeof a[property] === "string" && typeof b[property] === "string";
          if(isString) return a[property].localeCompare(b[property], undefined, { numeric: true });

          return a[property] - b[property];
        });
        break;

      case SortOrder.descending:
        sorted = copyArr.sort((a, b) => {
          const isString = typeof b[property] === "string" && typeof a[property] === "string";
          if(isString) return b[property].localeCompare(a[property], undefined, { numeric: true });

          return b[property] - a[property];
        });
        break;

      default: throw new Error('Unsupported order or no pass prop on object')
    }
    
    return sorted;
  }
}
