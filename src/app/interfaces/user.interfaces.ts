export interface  User {
  uid: string;
  nombre:string;
  apellidos:string;
  bloque?:number;
  portal?:number;
  piso?:number;
  letra?:string;
  correo:string;
  contrasena:string;
  admin:boolean;
  key$?:string;
}
