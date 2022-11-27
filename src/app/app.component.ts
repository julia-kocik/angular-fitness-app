import { Component, OnInit} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-fitness-app';
  isPhonePortrait = false;
  isTabletPortrait = false;

  constructor(private responsive: BreakpointObserver) {}
  ngOnInit() {
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        if(!breakpoints[Breakpoints.HandsetPortrait] && !breakpoints[Breakpoints.TabletPortrait]) {
          this.isTabletPortrait = false;
          this.isPhonePortrait = false;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.isPhonePortrait = true;
          this.isTabletPortrait = false;
        } else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.isTabletPortrait = true;
          this.isPhonePortrait = false;
        }
      console.log(this.isPhonePortrait, this.isTabletPortrait)
  });
  }
}
