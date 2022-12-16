import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: fromApp.State}>){}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading))
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading
    // })
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

  // ngOnDestroy(): void {
  //   if(this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
