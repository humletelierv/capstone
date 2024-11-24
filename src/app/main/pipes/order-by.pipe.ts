import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: string[], direction: string = 'desc'): string[] {
    if (!array || array.length === 0) return [];
    return array.sort((a, b) => {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
