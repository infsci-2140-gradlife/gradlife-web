import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { GLQuery } from '../models/gl-query';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(
    private typesService: TypesService,
    private router: Router) { }

  navigate(query: GLQuery) {
    console.log('what is', query);
    this.router.navigate(
      ['search', query.text],
      { queryParams: this.typesService.toParams(query) }
    );
  }
}
