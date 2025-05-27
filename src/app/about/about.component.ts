import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

interface Technology {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
        animate(
          '0.4s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class AboutComponent {
  technologies: Technology[] = [
    {
      name: 'Angular',
      icon: 'https://angular.io/assets/images/logos/angular/angular.svg',
      description: 'Modern web framework for building scalable applications',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
      description:
        'Typed superset of JavaScript that compiles to plain JavaScript',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://stackdiary.com/wp-content/uploads/2022/10/Tailwind-CSS-15-Component-Libraries-UI-Kits.png',
      description: 'Utility-first CSS framework for rapid UI development',
    },
    {
      name: 'RxJS',
      icon: 'https://rxjs.dev/assets/images/logos/Rx_Logo_S.png',
      description: 'Reactive Extensions Library for JavaScript',
    },
    {
      name: 'Cursor AI',
      icon: 'https://brianchristner.io/content/images/2024/09/Cursor-AI.png',
      description: 'AI-powered coding assistant for enhanced development',
    },
  ];

  features: string[] = [
    'Dynamic coffee image gallery',
    'Real-time search functionality',
    'Responsive design for all devices',
    'Beautiful animations and transitions',
    'Persistent state management',
    'Modern UI/UX principles',
  ];
}
