import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from './pipes/keys.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuariosComponent,
    UsuarioComponent,
    HomeComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HomeService],
  bootstrap: [AppComponent],
})
export class AppModule {
  private static HttpModule: any;
}
