import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interfaces/user.interfaces';
import {HomeService} from '../../services/home.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: User = {
    nombre: '',
    apellidos: '',
    bloque: 0,
    portal: 0,
    piso: 0,
    letra: ''
  };

  nuevo = false;
  id: string;
  id2: any;

  constructor( private homeService: HomeService,
               private router: Router,
               private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      this.id = params.id;

      if (this.id !== 'nuevo') {
        this.homeService.getUser(this.id).subscribe((data: User) => {
          this.user = data;
        });
      }
    });

  }

  ngOnInit() {
  }

  guardar() {
    if (this.id === 'nuevo') {
      console.log(this.user);
      this.homeService.nuevoUser(this.user)
        .subscribe( data => {
          this.id2 = data;
          this.id2 = this.id2.name;
          this.router.navigate(['/user', this.id2]);
          this.nuevo = true;
          },
          error => console.log(error));
    } else {
      this.homeService.actualizarUser(this.user, this.id)
        .subscribe( data => {
            console.log(data);
          },
          error => console.log(error));

    }

  }

  // borra(key$:string) {
  //   this.homeService.borrarUser(key$).subscribe(respuesta =>{
  //     console.log(respuesta);
  //   })
  // }

  nuevoUser() {
    this.homeService.nuevoUser(this.user);
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/user', 'nuevo']);
    forma.reset();
  }

}
