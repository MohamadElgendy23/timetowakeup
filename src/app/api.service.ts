import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CoffeeImage {
  url: string;
  tags: string[];
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://coffee.alexflipnote.dev/random.json';

  // Common coffee-related terms for metadata
  private coffeeTerms = [
    'espresso',
    'latte',
    'cappuccino',
    'americano',
    'mocha',
    'dark roast',
    'light roast',
    'medium roast',
    'coffee beans',
    'coffee art',
    'coffee shop',
    'iced coffee',
    'hot coffee',
    'coffee machine',
    'coffee maker',
    'coffee mug',
    'coffee cup',
  ];

  constructor(private http: HttpClient) {}

  getRandomCoffee(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  private generateRandomMetadata(): { tags: string[]; description: string } {
    // Randomly select 2-4 tags
    const numTags = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...this.coffeeTerms].sort(() => 0.5 - Math.random());
    const selectedTags = shuffled.slice(0, numTags);

    // Generate a description using the selected tags
    const description = `A beautiful ${selectedTags.join(' and ')} coffee image`;

    return {
      tags: selectedTags,
      description,
    };
  }

  getMultipleCoffeeImages(count: number): Observable<CoffeeImage[]> {
    const requests = Array(count)
      .fill(null)
      .map(() => this.getRandomCoffee());

    return forkJoin(requests).pipe(
      map((responses) =>
        responses.map((response) => {
          const metadata = this.generateRandomMetadata();
          return {
            url: response.file,
            ...metadata,
          };
        }),
      ),
    );
  }
}
