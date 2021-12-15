import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { defaultIfEmpty, Observable, combineLatest, Subscription } from 'rxjs';
import { QueryResult } from 'src/app/models/query-result';
import { ApiService } from 'src/app/services/api.service';
import { WindowService } from 'src/app/services/window.service';
import { GLQuery } from 'src/app/models/gl-query';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  // routing
  private lastParams: Params;
  private lastQueryParams: Params;

  // query (internal)
  private query: GLQuery;
  private querySub$: Subscription;
  queryResult$: Observable<QueryResult | null>;
  pageSize: number = 10;
  pageNum: number = 0;

  // template bindings for the query
  queryText: string;
  startDate: Date;
  endDate: Date;
  location: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private apiService: ApiService,
    private typesService: TypesService,
    private windowService: WindowService) { }

  ngOnInit(): void {
    this.querySub$ = combineLatest([this.route.params, this.route.queryParams]).subscribe(all => {
      this.lastParams = all[0];
      this.lastQueryParams = all[1];
      this.storeQueryPresentation(this.lastParams, this.lastQueryParams);
      this.search();
    });
  }

  ngOnDestroy(): void {
    if (this.querySub$) {
      this.querySub$.unsubscribe();
    }
  }

  private storeQueryPresentation(params: Params, queryParams: Params) {
    if (params && params['query']) {
      this.queryText = params['query'];
    }

    if (queryParams) {
      if (queryParams['startDate']) {
        this.startDate = new Date(Date.parse(queryParams['startDate']));
      }

      if (queryParams['endDate']) {
        this.endDate = new Date(Date.parse(queryParams['endDate']));
      }

      if (queryParams['location']) {
        this.location = queryParams['location'];
      }
    }
  }

  setPaging(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNum = event.pageIndex;
    this.search();
  }

  async search() {
    this.query = this.typesService.toQuery(this.lastParams, this.lastQueryParams);
    console.log('search for', this.query, this.pageNum, this.pageSize);
    this.queryResult$ = this.apiService.searchEvents(this.query, this.pageNum, this.pageSize).pipe(defaultIfEmpty(null));
    this.windowService.get().scrollTo(0, 0);
  }

  navigate(query: GLQuery) {
    console.log('navving', query);
    this.router.navigate(
      ['search', query.text],
      { queryParams: this.typesService.toParams(query) }
    );
  }
}
