import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>()
  @Input() isPhonePortrait: boolean = false
  @Input() isTabletPortrait: boolean = false
  isAuth!: boolean;
  subscription!: Subscription
  constructor(private authService: AuthService){}
  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
