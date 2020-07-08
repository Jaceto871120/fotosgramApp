import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  loginUser = {
    email: 'pauline.barreto@gmail.com',
    password: '12345678'
  };

  registroUsuario: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
  };

  constructor(private usuarioService: UsuarioService,
              private navController: NavController,
              private uiService : UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ) {

    if (fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido){
      // Navegar a Tabs
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    }else {
      // Mostrar alerta de usuario y contrasena
      this.uiService.alertaInformativa('Usuario y/o contrasena no son correctos');
    }
  }

  async registro( fRegistro: NgForm ) {

    if (fRegistro.invalid){ return; }

    const valido = await this.usuarioService.registro(this.registroUsuario);

    if (valido){
      // Navegar a Tabs
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    }else {
      // Mostrar alerta de usuario y contrasena
      this.uiService.alertaInformativa('Ese correo electronico ya existe');
    }
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
