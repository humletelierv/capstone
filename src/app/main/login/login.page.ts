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
  isLoading: boolean = false; // Variable para controlar el estado de carga
  submitted: boolean = false; // Para manejar la validación después de enviar el formulario

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

  // Validar si el campo tiene errores
  public campo(control: string) {
    return this.formInic.get(control);
  }

  // Saber si el campo fue tocado
  public fueTocado(control: string) {
    return this.formInic.get(control).touched;
  }

  // Mostrar errores dinámicamente
  public getErrorMessage(control: string): string {
    const campo = this.campo(control);
    if (campo.hasError('required')) return `${control === 'username' ? 'Usuario' : 'Contraseña'} es obligatorio.`;
    if (campo.hasError('minlength')) return `${control === 'username' ? 'Usuario' : 'Contraseña'} es muy corto.`;
    if (campo.hasError('maxlength')) return `La contraseña es demasiado larga.`;
    return '';
  }

  // Acción al presionar Enter
  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.formInic.valid) {
      this.onLogin();
    }
  }

  // Método para iniciar sesión
  async onLogin() {
    this.submitted = true; // Marca los campos como "tocados" después de intentar el envío

    // Si el formulario es inválido, no hacer nada
    if (this.formInic.invalid) {
      return;
    }

    this.isLoading = true; // Inicia el estado de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    // Llamada al servicio de autenticación
    this.authService.login(this.formInic.value.username, this.formInic.value.password).subscribe(
      async () => {
        this.isLoading = false; // Finaliza el estado de carga
        await loading.dismiss();
        this.navCtrl.navigateRoot('/home'); // Navega a la página principal
      },
      async (error) => {
        this.isLoading = false; // Finaliza el estado de carga
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
