import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFunko'
})
export class FilterFunkoPipe implements PipeTransform {
  transform(funkoList: any[]) {
    return funkoList.filter(f => f.owned).length;
  }
}
