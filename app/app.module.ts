import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Nuevo enfoque
=======
import { HttpClientModule, HTTP_INTERCEPTORS , provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Nuevo enfoque
>>>>>>> master
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';  // Importa IonicStorageModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
<<<<<<< HEAD
    IonicStorageModule.forRoot()
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
=======
    IonicStorageModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
>>>>>>> master
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
