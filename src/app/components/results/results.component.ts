import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscriber, Subscription } from 'rxjs';
import { GLEvent } from 'src/app/models/GLEvent';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  events: GLEvent[] = [];
  isLoading = false;
  query: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute, 
    private router: Router) { }

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

  navigate(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
  }
}
