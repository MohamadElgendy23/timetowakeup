import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
})
export class RandomComponent implements OnInit {
  randomCoffee: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRandomCoffee().subscribe((response: any) => {
      this.randomCoffee = response.file;
    });
  }
}
