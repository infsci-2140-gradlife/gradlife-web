import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

@Pipe({ name: 'dayjs' })
export class DayjsPipe implements PipeTransform {
  private SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

  transform(value: Date, ...args: unknown[]): string | null {
    const superpowered = dayjs(value);

    if (args.length == 0)
      return `${superpowered.format('LL')}`;

    if (dayjs(superpowered).diff(new Date()) > this.SEVEN_DAYS) {
      return `(${superpowered.fromNow()})`;
    }

    return null;
  }
}
