import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.loginForm)
    this.loginForm.reset()
  }

  get userName() { 
    return this.loginForm.get('userName'); 
  }

  get password() { 
    return this.loginForm.get('password'); 
  }
}
