import { Injectable } from '@angular/core';
import {User} from '../interfaces/user.interfaces';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) { }

  formData: User;

  getUsuarios() {
    return this.db.collection('Users').snapshotChanges();
  }
}
