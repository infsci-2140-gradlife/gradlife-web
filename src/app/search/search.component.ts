import { Component, OnInit } from '@angular/core';
import { firstValueFrom, interval, Observable, map } from 'rxjs';
import { GLEvent } from '../models/gl-event';
import { QueryResult } from '../models/query-result';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  placeholder$: Observable<string>;
  query: string = '';
  events: GLEvent[];
  queryResult: QueryResult;
  isLoading = false;
  private popularTerms: string[];

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.popularTerms = await firstValueFrom(this.apiService.getPopularTerms());
    this.placeholder$ = interval(5000).pipe(map(_ => {
      if (this.popularTerms && this.popularTerms.length) {
        const popTerm = this.popularTerms[Math.floor(Math.random() * this.popularTerms.length)];
        return `Try "${popTerm}"`;
      }

      return 'Try "movie night"';
    }));
  }

  async click() {
    this.isLoading = true;
    this.queryResult = await firstValueFrom(this.apiService.searchEvents(this.query))
    this.isLoading = false;
  }
}
