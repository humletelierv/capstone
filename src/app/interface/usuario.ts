export interface Usuario {
  username: string;
  password: string;
  role: string;
  actividad: string;


  }

export interface UsuarioId extends Usuario {
  rut: string;
}
