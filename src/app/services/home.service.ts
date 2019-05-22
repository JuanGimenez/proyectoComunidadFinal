import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeURL = 'https://proyectocomunidad-4ea87.firebaseio.com/user.json';
  usuarioURL = 'https://proyectocomunidad-4ea87.firebaseio.com/user/';

  constructor( private http: HttpClient) { }

  nuevoUser( user: User ) {

    const body = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.homeURL, body, { headers } )
      .pipe(map(res => {
        console.log(res);
        return res;
      }));


  }

  actualizarUser( user: User, key$: string ) {

    const body = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${ this.usuarioURL }/${ key$ }.json` ;

    return this.http.put( url , body, { headers } )
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  getUsers() {
    return this.http.get(this.homeURL)
      .pipe(map( res => res));

  }

  getUser( key$: string ) {
    const url = `${ this.usuarioURL }/${ key$ }.json` ;

    return this.http.get(url)
      .pipe(map( res => res));

  }



  borrarUser(key$: string) {
    const url = `${ this.usuarioURL }/${ key$ }.json` ;
    return this.http.delete( url )
      .pipe( map( res => res));

  }

}
