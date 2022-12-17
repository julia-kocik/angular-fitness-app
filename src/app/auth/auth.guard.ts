import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from "@angular/router"
import * as fromRoot from '../app.reducer';
import { Store } from "@ngrx/store";
import { take } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>) {}

  canActivate() {
     return this.store.select(fromRoot.getIsAuth)
  }

  canLoad() {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1))
  }
}
