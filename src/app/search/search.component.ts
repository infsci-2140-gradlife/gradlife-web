import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, interval, Observable, map } from 'rxjs';
import { GLEvent } from 'src/app/models/gl-event';
import { QueryResult } from '../models/query-result';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  placeholder$: Observable<string>;
  query: string = '';
  events: GLEvent[];
  queryResult: QueryResult;
  isLoading = false;
  private popularTerms: string[];

  constructor(private apiService: ApiService, private router: Router) { }

  
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

  navigate(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
  }
  
  async click() {
    this.isLoading = true;
    this.queryResult = await firstValueFrom(this.apiService.searchEvents(this.query))
    this.isLoading = false;
  }
}
