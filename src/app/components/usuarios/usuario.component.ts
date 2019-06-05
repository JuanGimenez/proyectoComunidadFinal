import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interfaces/user.interfaces';
import {HomeService} from '../../services/home.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UsuarioService} from '../../services/usuario.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: User = {
    uid: '',
    nombre: '',
    apellidos: '',
    bloque: 0,
    portal: 0,
    piso: 0,
    letra: '',
    correo: '',
    contrasena: '',
    role: ''
  };

  usersArray: User[];
  nuevo = false;
  id: string;
  id2: any;

  constructor( private homeService: HomeService,
               private uService: UsuarioService,
               private router: Router,
               private route: ActivatedRoute,
               private auth: AuthService,
               private db: AngularFirestore
  ) {

    // this.route.params.subscribe(params => {
    //   this.id = params.id;
    //
    //   if (this.id !== 'nuevo') {
    //     this.auth.getUser(this.id).subscribe((data: User) => {
    //       this.user = data;
    //     });
    //   }
    // });

    this.uService.getUsuarios().subscribe(res => {
      this.usersArray = res.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data() } as User;
      });
    });
  }

  ngOnInit() {
    this.resetForm();
    this.uService.formData = Object.assign({});
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
      this.homeService.actualizarUser(this.user, this.user.uid)
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
    this.router.navigate(['registrarse']);
    forma.reset();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();

      form.resetForm();
      this.uService.formData = {
        uid: '',
        nombre: '',
        apellidos: '',
        bloque: null,
        portal: null,
        piso: null,
        letra: '',
        correo: '',
        contrasena: '',
        role: '',
      };
    }
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    this.db.collection('Users').add(data);
    this.resetForm(form);

  }

  onEdit(user: User) {
    this.uService.formData = Object.assign({}, user);
  }
}
