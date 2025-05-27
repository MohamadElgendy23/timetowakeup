import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private searchService: SearchService) {
    this.searchQuery = this.searchService.getSearchQuery();
  }

  onSearchChange() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }
}
