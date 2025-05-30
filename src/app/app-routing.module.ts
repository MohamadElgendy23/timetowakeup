import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { RandomComponent } from './random/random.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'coffee', component: CoffeeComponent },
  { path: 'random', component: RandomComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
