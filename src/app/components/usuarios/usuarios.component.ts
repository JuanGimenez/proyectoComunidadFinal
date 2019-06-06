import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interfaces/user.interfaces';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {UsuarioService} from '../../services/usuario.service';
import {NgForm} from '@angular/forms';
import { ModelComponent } from './../model/model.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

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

  loading = true;
  userFirebase: firebase.User;
  usersArray: User[];
  formData: User;
  nuevo = false;
  id: string;
  id2: any;

  constructor( private homeService: HomeService,
               private uService: UsuarioService,
               private router: Router,
               private route: ActivatedRoute,
               private auth: AuthService,
               private db: AngularFirestore) {
  }

  ngOnInit() {
    this.uService.formData = Object.assign({});

    this.auth.getUserState().subscribe( user => {
      this.userFirebase = user;
    });

    this.uService.getUsuarios().subscribe(res => {
      this.usersArray = res.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data() } as User;
      });
    });

  }

  onEdit(user: User) {
    this.uService.formData = Object.assign({}, user);
  }

  guardar() {
    if (this.id === 'nuevo') {
      console.log(this.userFirebase);
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
    const data = Object.assign({}, form.value);
    delete data.uid;
    if (form.value.uid == null) {
    this.db.collection('Users').add(data);
    } else {
      this.db.doc('Users/' + form.value.uid).update(data);
      this.resetForm(form);
    }

  }

}
