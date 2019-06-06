import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) { }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user. lastName
        });
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      }).catch( error => {
        this.eventAuthError.next(error);
    });
  }

  getUserState() {
    return this.afAuth.authState;
  }

  insertUserData( userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      nombre: this.newUser.nombre,
      apellidos: this.newUser.apellidos,
      bloque: this.newUser.bloque,
      portal: this.newUser.portal,
      piso: this.newUser.piso,
      letra: this.newUser.letra,
      role: '',
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/home']);
        }
      });
  }

  isAdmin() {
    return this.db.collection('Users').get().toPromise().then( (snapshot) => {
      snapshot.docs.forEach( doc => {
        console.log(doc.data());
      });
    });
  }

  getDataUser() {
    return this.db.collection('Users').snapshotChanges();
  }

  // getDataUser() {
  //   this.db.collection('Users').get().toPromise().then( (snapshot) => {
  //     snapshot.docs.forEach( doc => {
  //       return doc;
  //     });
  //   });
  // }
}
