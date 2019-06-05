import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.User;
  nombreComunidad = 'Las Yucas';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
    });
  }

}
