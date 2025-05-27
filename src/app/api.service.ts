import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://coffee.alexflipnote.dev/random.json';

  constructor(private http: HttpClient) {}

  getRandomCoffee(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMultipleCoffeeImages(count: number): Observable<string[]> {
    const requests = Array(count)
      .fill(null)
      .map(() => this.getRandomCoffee());
    return forkJoin(requests).pipe(
      map((responses) => responses.map((response) => response.file)),
    );
  }
}
