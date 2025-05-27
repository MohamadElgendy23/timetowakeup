import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent implements OnInit, OnDestroy {
  allCoffeeImages: string[] = [];
  coffeeImages: string[] = [];
  loading: boolean = true;
  error: string | null = null;
  private searchSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private searchService: SearchService,
  ) {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        this.filterImages(query);
      },
    );
  }

  ngOnInit() {
    this.loadImages();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private loadImages() {
    this.loading = true;
    this.error = null;

    this.apiService.getMultipleCoffeeImages(12).subscribe({
      next: (images) => {
        this.allCoffeeImages = images;
        this.filterImages(this.searchService.getSearchQuery());
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading coffee images:', error);
        this.error = 'Failed to load coffee images. Please try again later.';
        this.loading = false;
      },
    });
  }

  private filterImages(query: string) {
    if (!query.trim()) {
      this.coffeeImages = this.allCoffeeImages;
    } else {
      // For now, we'll just filter based on the URL containing the query
      // In a real application, you might want to use tags or other metadata
      this.coffeeImages = this.allCoffeeImages.filter((url) =>
        url.toLowerCase().includes(query.toLowerCase()),
      );
    }
  }

  refreshImages() {
    this.loadImages();
  }
}
