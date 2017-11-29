import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, exponent: number): string {
    const limit = exponent > 0 ? exponent : 18;

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
