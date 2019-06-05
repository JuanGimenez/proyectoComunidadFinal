import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user.interfaces';
import {AngularFirestore} from '@angular/fire/firestore';
import {subscribeToPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private db: AngularFirestore) { }

  // list: User[];
  usersArray: User[];
  formData: User;
  dataUser: firebase.firestore.DocumentData = document.querySelector('#user-list');
  user: firebase.User;

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
    });

    this.auth.getDataUser().subscribe(res => {
      this.usersArray = res.map(item => {
        return {
        uid: item.payload.doc.id,
        ...item.payload.doc.data() } as User;
      });
    });
  }


  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  isAdmin() {

  }

  onEdit(user: User) {
    this.formData = Object.assign({}, user);
  }

}
