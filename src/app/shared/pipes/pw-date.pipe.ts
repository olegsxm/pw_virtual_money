import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pwDate'
})
export class PwDatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const data = value.split(' ');
    const date = data[0].split('-').reverse().join('.');
    const time = data[1].split(':').splice(0, 2).join(':');
    return `${date} ${time}`;
  }

}
