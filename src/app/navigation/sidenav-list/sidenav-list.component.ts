import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>()
  @Input() isPhonePortrait: boolean = false
  @Input() isTabletPortrait: boolean = false

  isAuth$!: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>){}
  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
