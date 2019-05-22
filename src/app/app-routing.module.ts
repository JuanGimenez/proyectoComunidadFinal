import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './components/usuarios/usuario.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'users', component: UsuariosComponent},
  { path: 'user/:id', component: UsuarioComponent },
  { path: '**', pathMatch: 'full' , redirectTo: 'heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
