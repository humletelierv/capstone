export interface InfoGerm {
  cod_germ: number; // Clave primaria
  batch: number;
  dia: number;
  hora: number;
  rociador: number;
  tretorno: number;
  texterior: number;
  tinferior: number;
  tsuperior: number;
  cajongerminacion: number;
  horareloj: string; // Hora como cadena
  fecha: Date; // Fecha en formato ISO (Date)
}
