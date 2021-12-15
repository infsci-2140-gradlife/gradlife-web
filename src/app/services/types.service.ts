import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GLQuery } from '../models/gl-query';
import { DateService } from './date.service';

@Injectable({ providedIn: 'root' })
export class TypesService {
  constructor(private dateService: DateService) { }

  toParams(query: GLQuery): Params {
    const params: Params = {}
    if (query.location) {
      params['location'] = query.location;
    }

    if (query.startDate) {
      params['startDate'] = query.startDate;
    }

    if (query.endDate) { 
      params['endDate'] = query.endDate;
    }

    return params;
  }

  toQuery(params: Params): GLQuery {
    const query: GLQuery = {
      text: params['query'],
    };

    if (params['startDate']) {
      query.startDate = this.dateService.toDate(params['startDate']);
    }

    if (params['endDate']) {
      query.startDate = this.dateService.toDate(params['endDate']);
    }

    if (params['location']) {
      query.location = params['location'];
    }
    
    return query;
  }
}
