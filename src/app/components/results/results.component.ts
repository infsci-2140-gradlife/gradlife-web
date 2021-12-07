import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscriber, Subscription } from 'rxjs';
import { GLEvent } from 'src/app/models/GLEvent';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  events: GLEvent[] = [];
  isLoading = false;
  query: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.query = p['query'];
      this.click()
    })
  }

  async click() {
    this.isLoading = true;
    this.events = await firstValueFrom(this.apiService.searchEvents(this.query))
    this.isLoading = false;
  }
}
