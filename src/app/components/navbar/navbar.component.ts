import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.User;
  nombreComunidad = 'Las Yucas';
  usersArray: User[];

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
    });

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

}
