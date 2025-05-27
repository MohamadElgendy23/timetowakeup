import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
      ></div>
      <span class="ml-2 text-gray-600">{{ message }}</span>
    </div>
  `,
  styles: [],
})
export class LoadingSpinnerComponent {
  message = 'Loading...';
}
