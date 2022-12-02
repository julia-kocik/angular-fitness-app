import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isPhonePortrait: boolean = false
  @Input() isTabletPortrait: boolean = false

  onToggleSidenav(): void {
    this.sidenavToggle.emit()
  }
}
