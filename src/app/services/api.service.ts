import { Injectable } from '@angular/core';
import { Observable, of, delay, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoremIpsum } from 'lorem-ipsum';
import { GLEvent } from '../models/GLEvent';
import { GLSource } from '../models/GLSource';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  private MOCK_DELAY = 1500;
  private MOCK_POP_TERMS = [
    "Student dinner",
    "Game night",
    "Study party",
    "Pizza night",
    "Movie",
    "Concert",
    "Pickup basketball",
    "Job talk",
    "Lecture",
    "Intramurals",
    "Student association",
    "Job fair",
    "Internship fair",
    "Symphony performance",
    "End-of-semester celebration"
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

  private MOCK_SOURCES = [
    { 
      name: 'CoMeT',
      url: 'http://halley.exp.sis.pitt.edu/comet/index.do'
    },
    {
      name: 'Pitt Academic Calendar',
      url: 'https://catalog.upp.pitt.edu/mime/media/view/212/21142/Academic+Calendar+2021-2022.pdf',
    },
    {
      name: 'calendar.pitt.edu',
      url: 'https://calendar.pitt.edu',
    },
    {
      name: 'Gradlife browser extension',
      url: 'https://chrome.google.com/webstore/detail/gradlife/jfjjbolkhogppnkhfpgffepenimjellg',
    },
    {
      name: 'Personal email'
    },
    {
      name: 'Mailing list'
    }
  ];

  constructor(private http: HttpClient) { }

  private randomChoice<T>(list: Array<T>): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  // private randomDate(start = new Date('12/13/2021'), end = new Date('1/31/2022'), startHour = 0, endHour = 23) {
  //   var date = new Date(+start + Math.random() * (end.getUTCDate() - start.getUTCDate()));
  //   var hour = startHour + Math.random() * (endHour - startHour) | 0;
  //   date.setHours(hour);
  //   return date;
  // }

  getPopularTerms(): Observable<string[]> {
    return of(this.MOCK_POP_TERMS);
  }

  // searchEvents(query: string, pageNum = 1, pageSize = 20): Observable<GLEvent[]> {
  //   const events = [];

  //   for (let i = 0; i < pageSize; i++) {
  //     events.push({
  //       id: i,
  //       name: this.lorem.generateSentences(1),
  //       location: this.randomChoice(this.MOCK_LOCATIONS),
  //       description: this.lorem.generateParagraphs(1),
  //       date: this.randomDate(),
  //       source: this.randomChoice(this.MOCK_SOURCES),
  //     });
  //   }
  //   return of(events).pipe(delay(this.MOCK_DELAY));
  // }

  searchEvents(query: string, pageNum = 1, pageSize = 20): Observable<GLEvent[]> {
    const events: GLEvent[] = []

    return this.http.post(environment.searchApiUrl, { query }).pipe(map(res => {
      console.log('response', res);
      return [];
    }));
  }
}
