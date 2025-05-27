import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-random',
  imports: [],
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
})
export class RandomComponent {
  randomCoffee: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRandomCoffee().subscribe((randomCoffee) => {
      this.randomCoffee = randomCoffee;
    });
  }
}
