import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './components/usuarios/usuario.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {PadelComponent} from './components/padel/padel.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: 'users', component: UsuariosComponent},
  { path: 'user/:id', component: UsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'padel', component: PadelComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'registrarse', component: RegistrationComponent },
  { path: '**', pathMatch: 'full' , redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
