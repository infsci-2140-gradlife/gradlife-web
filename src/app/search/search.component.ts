import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GLEvent } from '../models/GLEvent';
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
  isLoading = false;
  private popularTerms: string[];

  constructor(private apiService: ApiService, private router: Router) { }

  navigate(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
  }
}
