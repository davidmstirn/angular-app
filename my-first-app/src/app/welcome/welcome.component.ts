import { Component } from '@angular/core';
import {DetailsComponent} from "./details/details.component";
import {AnalyticsService} from "../shared/analytics.service";

@Component({
  standalone: true,
  imports: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  providers: [AnalyticsService],
})
export class WelcomeComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
