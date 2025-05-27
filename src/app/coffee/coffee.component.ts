import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent implements OnInit {
  coffeeImages: string[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadImages();
  }

  private loadImages() {
    this.loading = true;
    this.error = null;

    this.apiService.getMultipleCoffeeImages(12).subscribe({
      next: (images) => {
        this.coffeeImages = images;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading coffee images:', error);
        this.error = 'Failed to load coffee images. Please try again later.';
        this.loading = false;
      },
    });
  }

  refreshImages() {
    this.loadImages();
  }
}
