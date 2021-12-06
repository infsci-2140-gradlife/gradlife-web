import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { LoremIpsum } from 'lorem-ipsum';
import { GLEvent } from '../models/GLEvent';

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
  private MOCK_EVENTS: GLEvent[] = [

  ];  

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

  getPopularTerms(): Observable<string[]> {
    return of(this.MOCK_POP_TERMS);
  }

  private randomDate(start = new Date('12/13/2021'), end = new Date('1/31/2022'), startHour = 0, endHour = 23) {
    var date = new Date(+start + Math.random() * (end.getUTCDate() - start.getUTCDate()));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }

  searchEvents(query: string, pageNum = 1, pageSize = 20): Observable<GLEvent[]> {
    const events = [];

    for (let i = 0; i < pageSize; i++) {
      events.push({
        id: i,
        name: this.lorem.generateSentences(1),
        location: '',
        description: this.lorem.generateParagraphs(1),
        date: this.randomDate(),
        source: 'Some source',
      });
    }
    return of(events).pipe(delay(this.MOCK_DELAY));
  }
}
