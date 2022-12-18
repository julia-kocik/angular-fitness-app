import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>){}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
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

}
