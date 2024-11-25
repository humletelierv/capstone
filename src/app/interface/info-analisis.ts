export interface InfoAnalisis {
  batch: number; // Campo primario
  id_estado: number;
  id_tipo_malta: number;
  fecha_produccion: string; // Representación de fechas como cadenas en formato ISO (YYYY-MM-DD)
  fecha_analisis: string; // Fechas también como cadenas
  id_cliente: number;
  id_tipo_horno: number;
  proceso_tag: string; // CharField mapeado como string
  id_variedad: number;
  silo_origen: string; // CharField con máximo 80 caracteres
  silo_destino_1: string; // CharField con máximo 40 caracteres
  malta_limpia: number;
  humedad: number; // FloatField mapeado como number
  tipo_sacarificacion: number; // FloatField mapeado como number
  ext_fino_ss: number; // FloatField mapeado como number
  ext_gru_ss: number; // FloatField mapeado como number
  fan: number; // FloatField mapeado como number
  id_analista: number;
}
