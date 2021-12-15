import { Injectable } from '@angular/core';

import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

@Injectable({ providedIn: 'root' })
export class DateService {

  toDate(date: string) {
    return dayjs(date).toDate();
  }
}
