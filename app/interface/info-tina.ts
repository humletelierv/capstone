export interface Tina {
  cod_tina: number;          // Código de la tina (clave primaria)
  batch: number;             // Número del batch asociado
  fecha: string;             // Fecha asociada (en formato YYYY-MM-DD)
  hora: string;              // Hora en formato string
  temptina1: number;         // Temperatura de la tina 1
  temptina2: number;         // Temperatura de la tina 2
  id_estado_tina: number;    // Identificador del estado de la tina
}
