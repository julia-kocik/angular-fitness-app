import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService){}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.userName,
      password: this.loginForm.value.password
    })
  }

  get userName() {
    return this.loginForm?.get('userName');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
}
