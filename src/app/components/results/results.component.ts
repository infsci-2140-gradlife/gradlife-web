import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscriber, Subscription } from 'rxjs';
import { GLEvent } from 'src/app/models/gl-event';
import { QueryResult } from 'src/app/models/query-result';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  queryResult: QueryResult;
  isLoading = false;
  query: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.query = p['query'];
      this.click()
    })
  }

  async click() {
    this.isLoading = true;
    this.queryResult = await firstValueFrom(this.apiService.searchEvents(this.query))
    console.log('results', this.queryResult);
    this.isLoading = false;
  }
}
