import { Component, OnInit,  } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadUsuarios();
  }

  // Cargar la lista de usuarios
  async loadUsuarios() {
    try {
      this.usuarios = await this.authService.getUsuarios();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }

  // Eliminar usuario
  async deleteUser(userId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Usuario',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.authService.deleteUser(userId);
              await this.loadUsuarios();
            } catch (error) {
              console.error('Error al eliminar usuario:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Abrir modal para crear un usuario
  async openCreateModal() {
    const alert = await this.alertCtrl.create({
      header: 'Crear Usuario',
      inputs: [
        { name: 'username', type: 'text', placeholder: 'Nombre de usuario' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
        { name: 'email', type: 'email', placeholder: 'Correo electrónico' },
        { name: 'first_name', type: 'text', placeholder: 'Nombre' },
        { name: 'last_name', type: 'text', placeholder: 'Apellido' },
        { name: 'rut', type: 'text', placeholder: 'RUT (Ej: 20199253-9)' },
        { name: 'role', type: 'text', placeholder: 'Rol (admin/user)' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: async (data) => {
            if (
              data.username &&
              data.password &&
              data.email &&
              data.first_name &&
              data.last_name &&
              data.rut &&
              data.role
            ) {
              try {
                await this.authService.createUser(data);
                await this.loadUsuarios();
              } catch (error) {
                console.error('Error al crear usuario:', error);
              }
            } else {
              console.error('Todos los campos son obligatorios');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Abrir modal para editar un usuario
  async openEditModal(user: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Usuario',
      inputs: [
        { name: 'username', type: 'text', value: user.username, placeholder: 'Nombre de usuario' },
        { name: 'password', type: 'password', placeholder: 'Nueva contraseña (opcional)' },
        { name: 'email', type: 'email', value: user.email, placeholder: 'Correo electrónico' },
        { name: 'first_name', type: 'text', value: user.first_name, placeholder: 'Nombre' },
        { name: 'last_name', type: 'text', value: user.last_name, placeholder: 'Apellido' },
        { name: 'rut', type: 'text', value: user.rut, placeholder: 'RUT (Ej: 20199253-9)' },
        { name: 'role', type: 'text', value: user.role, placeholder: 'Rol (admin/user)' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            const updatedData: any = {
              username: data.username,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              rut: data.rut,
              role: data.role,
            };

            // Solo actualiza la contraseña si se proporciona
            if (data.password) {
              updatedData.password = data.password;
            }

            try {
              await this.authService.updateUser(user.id, updatedData);
              await this.loadUsuarios();
            } catch (error) {
              console.error('Error al actualizar usuario:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

   // Navegación
   goBack(): void {
    this.router.navigate(['/configuracion-usuario']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goUser(): void {
    this.router.navigate(['/configuracion-usuario']);
  }

}

