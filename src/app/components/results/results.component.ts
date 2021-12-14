import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom, Subscriber, Subscription } from 'rxjs';
import { GLEvent } from 'src/app/models/gl-event';
import { QueryResult } from 'src/app/models/query-result';
import { ApiService } from 'src/app/services/api.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  queryResult: QueryResult;
  isLoading = false;
  query: string = '';

  // pagination
  pageSize: number = 10;
  pageNum: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private apiService: ApiService,
    private windowService: WindowService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.query = p['query'];
      this.click();
    })
  }

  setPaging(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNum = event.pageIndex;
    this.click();
  }

  async click() {
    this.isLoading = true;
    this.queryResult = await firstValueFrom(
      this.apiService.searchEvents(this.query, this.pageNum, this.pageSize));
    console.log('results', this.queryResult);
    this.isLoading = false;
    this.windowService.get().scrollTo(0, 0);
  }

  navigate(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
  }
}
