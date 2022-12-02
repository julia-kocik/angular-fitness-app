import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter<void>()
  @Input() isPhonePortrait: boolean = false
  @Input() isTabletPortrait: boolean = false
  onCloseSidenav() {
    this.sidenavClose.emit();
  }
}
