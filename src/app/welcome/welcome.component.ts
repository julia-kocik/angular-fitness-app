import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../responsive.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isPhonePortrait: boolean = false;
  isTabletPortrait: boolean = false;

    constructor(private responsive: BreakpointObserver, private responsiveService: ResponsiveService) {}
    ngOnInit() {
      this.responsive.observe([
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait])
        .subscribe(result => {
          const breakpoints = result.breakpoints;
          const resultValues = this.responsiveService.checkDementions(breakpoints[Breakpoints.HandsetPortrait], breakpoints[Breakpoints.TabletPortrait])
          this.isPhonePortrait = resultValues.isPhonePortrait
          this.isTabletPortrait = resultValues.isTabletPortrait
      });
  }
}
