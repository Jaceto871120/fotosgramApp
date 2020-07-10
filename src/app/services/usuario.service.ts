import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor( private http: HttpClient,
               private storage: Storage,
               private navController: NavController) { }

  login(email: string, password: string) {

    const data = {email, password };

    return new Promise(resolve => {

      this.http.post( URL + '/user/login', data).subscribe( async resp => {
        const okLogin = 'ok';
        const tokenLogin = 'token';

        if (resp[okLogin]) {
          await this.guardarToken(resp[tokenLogin]);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', {animated: true});
  }

  registro(usuario: Usuario){
    return new Promise( resolve => {

      this.http.post( URL + '/user/create', usuario).subscribe( async resp => {

        const okRegistro = 'ok';
        const tokenRegistro = 'token';

        if (resp[ okRegistro ]) {
          await this.guardarToken(resp[tokenRegistro]);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario(){

    if (!this.usuario._id){
      this.validaToken();
    }
    return {...this.usuario};
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if (!this.token){
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get( URL + '/user/', {headers} ).subscribe( resp => {
        const okValidar = 'ok';
        const usuarioValidar = 'usuario';
        if (resp[okValidar]){
          this.usuario = resp[usuarioValidar];
          resolve(true);
        }else{
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario( usuario: Usuario ){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve =>{
      this.http.post( URL + '/user/update', usuario, {headers}).subscribe(resp => {

        const okActualizar = 'ok';
        const tokenActualizar = 'token';

        if (resp[okActualizar]){
          this.guardarToken(resp[tokenActualizar]);
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }
}
