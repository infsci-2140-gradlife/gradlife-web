import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, interval, map, Observable } from 'rxjs';
import { GLQuery } from 'src/app/models/gl-query';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() query = '';
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() location: string;
  @Output() search = new EventEmitter<GLQuery>();
  
  // template controls
  locations: Observable<string[]>;
  
  // pretty suggestions
  private popularTerms: string[] = [];
  placeholder$: Observable<string>;

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.popularTerms = await firstValueFrom(this.apiService.getPopularTerms());
    this.locations = this.apiService.getLocations();
    this.placeholder$ = interval(5000).pipe(map(_ => {
      if (this.popularTerms && this.popularTerms.length) {
        const popTerm = this.popularTerms[Math.floor(Math.random() * this.popularTerms.length)];
        return `Try "${popTerm}"`;
      }

      return 'Try "movie night"';
    }));
  }

  raise() {
    this.search.emit({ 
      text: this.query,
      startDate: this.startDate,
      endDate: this.endDate,
      location: this.location
    });
  }

  formSubmit($event: Event) { 
    this.raise();
  }

  onEnter($event: Event) {
    $event.preventDefault();
    this.raise();
  }
}
