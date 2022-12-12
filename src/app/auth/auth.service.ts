import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private trainingService: TrainingService
    ) {}

  register(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubs();
        this.authChange.next(false);
        this.router.navigate(['/login'])
        this.isAuthenticated = true;
      }
    })
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated
  }
}
