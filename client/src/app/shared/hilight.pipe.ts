import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hilight'
})
export class HilightPipe implements PipeTransform {

  private escapeRegex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  transform(value: any, args: any): any {
    if (!args) { return value; }
    //AD, July 16, TODO: strong and em tags must be overlooked
    var re = new RegExp(this.escapeRegex(args), 'g'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    //console.log(value, args);
    return value.replace(re, "<mark>$&</mark>");
  }

}