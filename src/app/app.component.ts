import { Component, OnDestroy, OnInit} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ResponsiveService } from './responsive.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-fitness-app';
  isPhonePortrait = false;
  isTabletPortrait = false;
  private respSub!: Subscription

  constructor(
      private responsive: BreakpointObserver,
      private responsiveService: ResponsiveService,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.respSub = this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        const resultValues = this.responsiveService.checkDementions(breakpoints[Breakpoints.HandsetPortrait], breakpoints[Breakpoints.TabletPortrait])
        this.isPhonePortrait = resultValues.isPhonePortrait
        this.isTabletPortrait = resultValues.isTabletPortrait
    });

    this.authService.initAuthListener();
  }

  ngOnDestroy(): void {
    if (this.respSub) {
      this.respSub.unsubscribe();
    }
  }
}
