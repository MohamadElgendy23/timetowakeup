import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://coffee.alexflipnote.dev/random.json';

  constructor(private http: HttpClient) {}

  getRandomCoffee(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
