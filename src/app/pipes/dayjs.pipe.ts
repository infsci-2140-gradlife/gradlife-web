import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Pipe({ name: 'dayjs' })
export class DayjsPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    const superpowered = dayjs(value);
    return superpowered.fromNow();
  }
}
