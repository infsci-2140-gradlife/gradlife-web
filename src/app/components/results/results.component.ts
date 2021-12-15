import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { defaultIfEmpty, Observable, tap } from 'rxjs';
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
export class ResultsComponent implements OnInit {
  queryResult$: Observable<QueryResult | null>;

  // query
  private query: GLQuery;
  pageSize: number = 10;
  pageNum: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private apiService: ApiService,
    private typesService: TypesService,
    private windowService: WindowService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.query = this.typesService.toQuery(p);
      this.search()
    });
  }

  setPaging(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNum = event.pageIndex;
    this.search();
  }

  async search() {
    console.log('search for', this.query, this.pageNum, this.pageSize);
    this.queryResult$ = this.apiService.searchEvents(this.query, this.pageNum, this.pageSize).pipe(
      tap(results => console.log('results', results)),
      defaultIfEmpty(null));
    this.windowService.get().scrollTo(0, 0);
  }

  navigate(query: GLQuery) {
    this.router.navigate(
      ['search', query.text],
      { queryParams: this.typesService.toParams(query) }
    );
  }
}
