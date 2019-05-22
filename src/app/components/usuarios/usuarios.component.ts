import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: any[] = [];
  loading = true;

  constructor( private homeService: HomeService,
               private router: Router,
               private route: ActivatedRoute) {

    //
    // this.homeService.getUsers().subscribe( (data: any) => {
    //
    //   console.log(data);
    //   this.users = data;
    //   this.loading = false;
    // });
    this.homeService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.loading = false;
    });
  }

  ngOnInit() {

  }

  borrarUser(key$: string) {
    this.homeService.borrarUser(key$).subscribe( res => {
      if ( res ) {
        console.error(res);
      } else {
        delete this.users[key$];
      }
    });
  }

}
