import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from '../responsive.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isPhonePortrait: boolean = false;
  isTabletPortrait: boolean = false;
  private subscription!: Subscription;
    constructor(private responsive: BreakpointObserver, private responsiveService: ResponsiveService) {}
    ngOnInit() {
      this.subscription = this.responsive.observe([
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait])
        .subscribe(result => {
          const breakpoints = result.breakpoints;
          const resultValues = this.responsiveService.checkDementions(breakpoints[Breakpoints.HandsetPortrait], breakpoints[Breakpoints.TabletPortrait])
          this.isPhonePortrait = resultValues.isPhonePortrait
          this.isTabletPortrait = resultValues.isTabletPortrait
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
