import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Batch } from '../interface/batch';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://66f0a393f2a8bce81be658ae.mockapi.io/api/v1/';  // URL de la API
  private apiUrl = 'http://34.176.172.96/api';  // URL de la API de Django

  // BehaviorSubject para manejar el estado reactivo del nombre de usuario
  private usernameSubject = new BehaviorSubject<string>('');
  public username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();  // Inicializa el Ionic Storage
  }

  // Inicializa Ionic Storage
  async init() {
    await this.storage.create();
    const username = await this.storage.get('username');
    if (username) {
      this.usernameSubject.next(username);
    }
  }

  // // Método para iniciar sesión y actualizar el BehaviorSubject
  // login(username: string, password: string): Observable<UsuarioId | null> {
  //   return this.http.get<UsuarioId[]>(`${this.apiUrl}/usuarios`).pipe(
  //     map((usuarios) => {
  //       const user = usuarios.find(
  //         (u) => u.username === username && u.password === password
  //       );
  //       if (user) {
  //         // Guardamos el usuario en Ionic Storage
  //         this.storage?.set('user', user);
  //         this.usernameSubject.next(user.username);  // Actualizamos el BehaviorSubject con el nombre de usuario
  //       }
  //       return user || null;
  //     })
  //   );
  // }


  // Método para iniciar sesión y actualizar el BehaviorSubject
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { username, password }).pipe(
      tap(async (tokens) => {
        if (tokens && tokens.access) {
          // Guardamos los tokens y el nombre de usuario en Ionic Storage
          await this.storage.set('access_token', tokens.access);
          await this.storage.set('refresh_token', tokens.refresh);
          await this.storage.set('username', username);

          // Actualizamos el BehaviorSubject con el nombre de usuario
          this.usernameSubject.next(username);

          console.log('Tokens guardados:', tokens);
        } else {
          console.error('Autenticación fallida: tokens no recibidos');
        }
      })
    );
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('access_token');
    await this.storage.remove('refresh_token');
    await this.storage.remove('username');
    this.usernameSubject.next('');
  }

  // Método para obtener el nombre de usuario logueado desde Ionic Storage
  async getLoggedInUser(): Promise<string | null> {
    const username = await this.storage.get('username');
    return username || null;
  }

  // Método para refrescar el token de acceso
  refreshToken(): Observable<any> {
    return from(this.storage.get('refresh_token')).pipe(
      switchMap((refresh) => {
        return this.http.post<any>(`${this.apiUrl}/token/refresh/`, { refresh });
      }),
      tap(async (tokens) => {
        if (tokens && tokens.access) {
          await this.storage.set('access_token', tokens.access);
        } else {
          // Si el refresh token es inválido, cerramos sesión
          await this.logout();
        }
      })
    );
  }

  // Método para realizar solicitudes protegidas
  async getProtectedData(): Promise<any> {
    const token = await this.storage.get('access_token');
    return this.http.get(`${this.apiUrl}/protected-endpoint/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).toPromise();
  }

  async getUsuarios(): Promise<any> {
    const token = await this.storage.get('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/usuarios/`, { headers }).toPromise();
  }

//   // Método para actualizar el estado de actividad del usuario
//   updateActividad(username: string, actividad: string): Observable<UsuarioId | null> {
//     return this.http.get<UsuarioId[]>(`${this.apiUrl}/usuarios`).pipe(
//       switchMap((usuarios) => {
//         const user = usuarios.find((u) => u.username === username);
//         if (user) {
//           const updatedUser = { ...user, actividad };

//           // Hacemos una solicitud PUT para actualizar el usuario
//           return this.http.put<UsuarioId>(`${this.apiUrl}/usuarios/${user.rut}`, updatedUser);
//         }
//         return new Observable<UsuarioId | null>((observer) => {
//           observer.next(null);
//           observer.complete();
//         });
//       })
//     );
//   }

// // Método para obtener todos los Batch
// getBatches(): Observable<any[]> {
//   return this.http.get<any>(`${this.apiUrl}/Batch`).pipe(
//     map((res) => res || [])  // Retorna la lista de batch o una lista vacía
//   );
// }


// Método GET para obtener los datos con token
getBatches(): Observable<Batch[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<Batch[]>(`${this.apiUrl}/info-produccion/`, {
        headers,
      });
    })
  );
}

// auth.service.ts
async isAuthenticated(): Promise<boolean> {
  const token = await this.storage.get('access_token');
  return !!token;
}



}
