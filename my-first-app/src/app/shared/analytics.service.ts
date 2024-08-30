import { Injectable } from '@angular/core';

@Injectable(/*{ providedIn: 'root' }*/)
export class AnalyticsService {

  private count: number = 0;

  registerClick() {
    this.count++;
    console.log(`Clicked! (${this.count})`);
  }
}
