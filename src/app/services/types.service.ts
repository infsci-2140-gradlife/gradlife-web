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

  toQuery(params: Params, queryParams: Params): GLQuery {
    const query: GLQuery = {
      text: params['query'],
    };

    if (queryParams) {
      if (queryParams['startDate']) {
        query.startDate = this.dateService.toDate(queryParams['startDate']);
      }
  
      if (queryParams['endDate']) {
        query.endDate = this.dateService.toDate(queryParams['endDate']);
      }
  
      if (queryParams['location']) {
        query.location = queryParams['location'];
      }
    }
    
    return query;
  }
}
