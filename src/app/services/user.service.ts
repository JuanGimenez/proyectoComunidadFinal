import { Injectable } from '@angular/core';
import {of as observableOf } from 'rxjs';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // uid = this.afAuth.authState.pipe(map(authState => authState.auth.uid),
  // );
  isAdmin = observableOf(true);

  constructor(private afAuth: AngularFireAuthModule,
              private router: Router) { }

  login() {}

  logout() {}
}
