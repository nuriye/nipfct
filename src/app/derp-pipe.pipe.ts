import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'derpPipe'
})
export class DerpPipePipe implements PipeTransform {

  transform(objects : any = []) {
    return Object.values(objects);
  }

}
