import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../interfaces/user.interfaces';
import {UsuarioService} from '../../services/usuario.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  closeResult: string;

  constructor(private modalService: NgbModal,
              private uService: UsuarioService,
              private db: AngularFirestore) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onEdit(user: User) {
    this.uService.formData = Object.assign({}, user);
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
}
