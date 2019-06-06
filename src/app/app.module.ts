import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './services/home.service';
import { AdminComponent } from './components/admin/admin.component';
import { TenisComponent } from './components/tenis/tenis.component';
import { PadelComponent } from './components/padel/padel.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RegistrationComponent } from './components/registration/registration.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModelComponent } from './components/model/model.component';
import { ModalDeleteComponent } from './components/model/modal-delete/modal-delete.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuariosComponent,
    UsuarioComponent,
    HomeComponent,
    AdminComponent,
    TenisComponent,
    PadelComponent,
    RegistrationComponent,
    ModelComponent,
    ModalDeleteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [HomeService],
  bootstrap: [AppComponent],
})
export class AppModule {
  private static HttpModule: any;
}
