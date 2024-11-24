import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formInic: FormGroup;
  showForgotPasswordModal: boolean = false; // Controla la visibilidad del modal

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.formInic = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });
  }

  ngOnInit() {}

  // Método para abrir el modal
  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
  }

  // Método para cerrar el modal
  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  public campo(control: string) {
    return this.formInic.get(control);
  }

  public fueTocado(control: string) {
    return this.formInic.get(control).touched;
  }

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    this.authService.login(this.formInic.value.username, this.formInic.value.password).subscribe(
      async () => {
        await loading.dismiss();
        // Navega a la página principal o dashboard
        this.navCtrl.navigateRoot('/home');
      },
      async (error) => {
        await loading.dismiss();
        let message = 'Error al iniciar sesión. Inténtalo de nuevo.';
        if (error.status === 401) {
          message = 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.';
        }
        const alert = await this.alertController.create({
          header: 'Inicio de sesión fallido',
          message: message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
