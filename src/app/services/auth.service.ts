import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Batch } from '../interface/batch';
import { Tina } from '../interface/info-tina'
import { InfoHorno } from '../interface/info-horno'
import { InfoGerm } from '../interface/info-germ'
import { Http } from '@capacitor-community/http';
import { InfoAnalisis } from '../interface/info-analisis';
import { identifierName } from '@angular/compiler';

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

  login(username: string, password: string) {
    const options = {
      url: `${this.apiUrl}/token/`,
      headers: { 'Content-Type': 'application/json' },
      data: { username, password },
      method: 'POST',
      params:{},
      // Permitir conexiones inseguras solo en desarrollo
      server: {
        allowInsecureConnections: true,
      },
    };

    return from(Http.request(options)).pipe(
      tap(async (res) => {
        const tokens = res.data; // Captura la respuesta del backend
        if (tokens && tokens.access) {
          // Guarda los tokens en el almacenamiento
          await this.storage.set('access_token', tokens.access);
          await this.storage.set('refresh_token', tokens.refresh);

          // Captura y almacena el `id` y el `username`

          await this.storage.set('id', tokens.id); // Guarda el `id` del usuario
          // console.log('id guardado:', tokens.id);

          await this.storage.set('username', username); // Guarda el `username`

          // Actualiza el BehaviorSubject
          this.usernameSubject.next(username);

          // console.log('Tokens y datos del usuario guardados:', tokens);
        } else {
          // console.error('Error: Tokens no recibidos en la respuesta del backend');
        }
      })
    );
  }


  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('access_token');
    await this.storage.remove('refresh_token');
    await this.storage.remove('username');
    await this.storage.remove('id');
    this.usernameSubject.next('');
  }

  async getLoggedInUser(): Promise<{ id: number; username: string } | null> {
    const id = await this.storage.get('id');
    const username = await this.storage.get('username');
    if (id && username) {
      return { id, username };
    }
    return null;
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
    // Obtén el token almacenado
    const token = await this.storage.get('access_token');

    // Configuración de la solicitud con Capacitor HTTP
    const options = {
      url: `${this.apiUrl}/usuarios/`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET', // Método HTTP para obtener datos
      params: {},
      allowInsecureConnections: true, // Solo si estás en un entorno de pruebas
    };

    try {
      // Realiza la solicitud HTTP
      const response = await Http.request(options);

      // Devuelve los datos de la respuesta
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error; // Maneja el error según sea necesario
    }
  }

// Método GET para obtener los datos con token
getBatches(): Observable<Batch[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        url: `${this.apiUrl}/info-produccion/`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        params: {}, // No tiene que ser Null
        server: {
          allowInsecureConnections: true, // Esto permite conexiones inseguras solo para pruebas
        },
      };

      // Utiliza Capacitor HTTP para la solicitud con configuración personalizada
      return from(Http.request(options)).pipe(
        map((response) => response.data as Batch[])
      );
    })
  );
}

// Método GET para obtener los datos con token
getInfoTina(): Observable<Tina[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        url: `${this.apiUrl}/info-tina/`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        params: {}, // No tiene que ser Null
        server: {
          allowInsecureConnections: true, // Esto permite conexiones inseguras solo para pruebas
        },
      };

      // Utiliza Capacitor HTTP para la solicitud con configuración personalizada
      return from(Http.request(options)).pipe(
        map((response) => response.data as Tina[])

      );
    })
  );
}

// Método GET para obtener los datos con token
infoHorno(): Observable<InfoHorno[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        url: `${this.apiUrl}/info-horno/`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        params: {}, // No tiene que ser Null
        server: {
          allowInsecureConnections: true, // Esto permite conexiones inseguras solo para pruebas
        },
      };

      // Utiliza Capacitor HTTP para la solicitud con configuración personalizada
      return from(Http.request(options)).pipe(
        map((response) => response.data as InfoHorno[])
      );
    })
  );
}

// Método GET para obtener los datos con token
infoGerm(): Observable<InfoGerm[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        url: `${this.apiUrl}/info-germ/`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        params: {}, // No tiene que ser Null
        server: {
          allowInsecureConnections: true, // Esto permite conexiones inseguras solo para pruebas
        },
      };

      // Utiliza Capacitor HTTP para la solicitud con configuración personalizada
      return from(Http.request(options)).pipe(
        map((response) => response.data as InfoGerm[])
      );
    })
  );
}

// Método GET para obtener los datos con token
infoAnalisis(): Observable<InfoAnalisis[]> {
  return from(this.storage.get('access_token')).pipe(
    switchMap((token) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        url: `${this.apiUrl}/info-analisis/`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        params: {}, // No tiene que ser Null
        server: {
          allowInsecureConnections: true, // Esto permite conexiones inseguras solo para pruebas
        },
      };

      // Utiliza Capacitor HTTP para la solicitud con configuración personalizada
      return from(Http.request(options)).pipe(
        map((response) => response.data as InfoAnalisis[])
      );
    })
  );
}

// auth.service.ts
async isAuthenticated(): Promise<boolean> {
  const token = await this.storage.get('access_token');
  return !!token;
}

async createUser(data: any): Promise<any> {
  // Obtén el token almacenado
  const token = await this.storage.get('access_token');

  // Configuración de la solicitud con Capacitor HTTP
  const options = {
    url: `${this.apiUrl}/usuarios/`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST', // Método HTTP para crear
    data: data, // Datos del usuario a crear
    params: {},
    allowInsecureConnections: true, // Solo si estás en un entorno de pruebas
  };

  try {
    // Realiza la solicitud HTTP
    const response = await Http.request(options);

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    throw error; // Maneja el error según sea necesario
  }
}

async updateUser(userId: number, data: any): Promise<any> {
  // Obtén el token almacenado
  const token = await this.storage.get('access_token');

  // Configuración de la solicitud con Capacitor HTTP
  const options = {
    url: `${this.apiUrl}/usuarios/${userId}/`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT', // Método HTTP para actualizar
    params: {},
    data: data, // Datos a actualizar
    allowInsecureConnections: true, // Solo si estás en un entorno de pruebas
  };

  try {
    // Realiza la solicitud HTTP
    const response = await Http.request(options);

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    throw error; // Maneja el error según lo necesario
  }
}

async deleteUser(userId: number): Promise<any> {
  // Obtén el token almacenado
  const token = await this.storage.get('access_token');

  // Configuración de la solicitud con Capacitor HTTP
  const options = {
    url: `${this.apiUrl}/usuarios/${userId}/`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE', // Método HTTP para eliminar
    params: {},
    allowInsecureConnections: true, // Solo si estás en un entorno de pruebas
  };

  try {
    // Realiza la solicitud HTTP
    const response = await Http.request(options);

    // Devuelve los datos de la respuesta o un mensaje de éxito
    return response.data || { message: 'Usuario eliminado correctamente' };
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    throw error; // Maneja el error según lo necesario
  }
}

async getUserDetails(userId: number): Promise<any> {
  // Obtén el token almacenado
  const token = await this.storage.get('access_token');

  // Configuración de la solicitud con Capacitor HTTP
  const options = {
    url: `${this.apiUrl}/usuarios/${userId}/`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET', // Método HTTP
    params: {}, // Asegúrate de enviar un objeto válido, aunque esté vacío
    allowInsecureConnections: true, // Solo si estás en un entorno de pruebas
  };

  try {
    // Realiza la solicitud HTTP
    const response = await Http.request(options);

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    throw error; // Maneja el error según lo necesario
  }
}
}
