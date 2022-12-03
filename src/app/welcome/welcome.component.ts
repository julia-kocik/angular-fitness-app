import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isPhonePortrait!: boolean
  isTabletPortrait!: boolean

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
