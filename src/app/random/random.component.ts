import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
})
export class RandomComponent {
  randomCoffee: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['loadNew']) {
      this.loadNewImage();
    } else {
      const savedImage = localStorage.getItem('lastCoffeeImage');
      if (savedImage) {
        this.randomCoffee = savedImage;
      } else {
        this.loadNewImage();
      }
    }
  }

  private loadNewImage() {
    this.isLoading = true;
    this.apiService.getRandomCoffee().subscribe({
      next: (response: any) => {
        const img = new Image();
        img.onload = () => {
          this.randomCoffee = response.file;
          this.isLoading = false;
          localStorage.setItem('lastCoffeeImage', response.file);
        };
        img.onerror = () => {
          this.isLoading = false;
          console.error('Error loading image');
        };
        img.src = response.file;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading coffee image:', error);
      },
    });
  }
}
