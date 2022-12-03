import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  isTabletPortrait: boolean = false;
  isPhonePortrait: boolean = false;
  constructor() { }
  checkDementions(handset: boolean, tablet: boolean): {isPhonePortrait: boolean, isTabletPortrait: boolean} {
    if(!handset && !tablet) {
          this.isTabletPortrait = false;
          this.isPhonePortrait = false;
        } else if (handset) {
          this.isPhonePortrait = true;
          this.isTabletPortrait = false;
        } else if (tablet) {
          this.isTabletPortrait = true;
          this.isPhonePortrait = false;
        }
    const result = {isPhonePortrait: this.isPhonePortrait, isTabletPortrait: this.isTabletPortrait}
    return result
  }
}
