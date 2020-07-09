import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
              private uiService: UiServiceService) {}

  ngOnInit(){
    this.usuario = this.usuarioService.getUsuario();
  }

  async actualizar(fActualizar: NgForm) {

    if (fActualizar.invalid){ return; }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if (actualizado) {
      // Toast con el mensaje de actualizado
      this.uiService.presentToast('Usuario Actualizado');
    }else{
      // Toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout(){
    console.log('Salir');
  }

}
