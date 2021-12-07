import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ValidationService {
  private URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  
  public isUrl(input: string): boolean {
    return this.URL_REGEX.test(input);
  }
}
