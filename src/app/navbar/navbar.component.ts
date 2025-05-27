import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchQuery: string = '';
  isMenuOpen: boolean = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {
    this.searchQuery = this.searchService.getSearchQuery();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearchChange() {
    this.searchService.updateSearchQuery(this.searchQuery);
    // Navigate to coffee page if we're not already there
    if (!this.router.url.includes('/coffee')) {
      this.router.navigate(['/coffee']);
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchService.updateSearchQuery('');
  }

  // Close menu when route changes
  closeMenu() {
    this.isMenuOpen = false;
  }
}
