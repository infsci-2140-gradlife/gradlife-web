import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryResult } from 'src/app/models/query-result';
import { GLQuery } from 'src/app/models/gl-query';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private MOCK_POP_TERMS = [
    "Dinner",
    "Game night",
    "Study",
    "Pizza",
    "Movie",
    "Concert",
    "Pickup basketball",
    "Talk",
    "Lecture",
    "Volleyball",
    "Students",
    "Job fair",
    "Internship",
    "Symphony",
    "Celebration"
  ];

  private MOCK_LOCATIONS = [
    'The Pete',
    'Cathedral of Learning',
    'Information Sciences Building',
    'William Pitt Student Union',
    'Learning Research and Development Center',
    'Sennott Square',
    'Ruskin Hall',
    'https://pitt.zoom.us',
    'Soldiers & Sailors Memorial',
    'Forbes Ave Starbucks',
    'UPMC Montefiore',
    'Zoom'
  ];

  constructor(private http: HttpClient) { }

  getLocations(): Observable<string[]> {
    return this.http.get(`${environment.searchApiUrl}/location`)
      .pipe(map((res: unknown) => <string[]> res));
  }

  getPopularTerms(): Observable<string[]> {
    return of(this.MOCK_POP_TERMS);
  }

  searchEvents(query: GLQuery, pageNum = 1, pageSize = 20): Observable<QueryResult> {
    return this.http.post(`${environment.searchApiUrl}/event`, { 
      query, 
      pageNum, 
      pageSize 
    }).pipe(map((res:any) => {
        for (let event of res.results) {
          // fix up pythonic property names
          event.isRecurring = event.is_recurring;
          delete event.is_recurring;
        }
        return <QueryResult> res;
      }));
  }
}
