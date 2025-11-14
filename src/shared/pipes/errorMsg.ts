import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMsg',
})
export class errorMsg implements PipeTransform {
  transform(errors: any, errorMap: Record<string, string>): string {
    if (!errors) return '';
    const firstErrorKey = Object.keys(errors)[0];
    return errorMap[firstErrorKey] || '';
  }
}