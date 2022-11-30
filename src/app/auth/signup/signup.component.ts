import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isPhonePortrait!: boolean;
  maxDate!: Date;
ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.isPhonePortrait = history.state.isPhonePortrait
    console.log(this.isPhonePortrait)
  }
  onSubmit(form:NgForm) {
    console.log(form)
  }
}
