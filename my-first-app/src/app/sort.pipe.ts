import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], property: string): unknown {
    const newArray = value.slice()
    newArray.sort((a, b) => {
      const fa = a[property];
      const fb = b[property];

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return newArray;
  }

}
