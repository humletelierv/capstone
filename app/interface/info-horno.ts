export interface InfoHorno {
  batch: string; // Clave primaria
  fecha: Date; // Fecha en formato ISO (Date)
  variedad: string; // Variedad del grano

  temp_sobre_grano: number;
  temp_bajo_tela: number;
  temp_ambiente: number;
  hr_sobre_tela: number;

  p_apertura_damper: number;
  presion_diferencial: number;

  gas_total: number;
  gas_et_1: number;
  gas_et_2: number;
  gas_et_3: number;
  gas_et_4: number;
  gas_et_5: number;
  gas_et_6: number;

  tiempo_total: number;
  tiempo_barra_e1: number;
  tiempo_barra_e2: number;
  tiempo_barra_e3: number;
  tiempo_barra_e4: number;
  tiempo_barra_e5: number;
  tiempo_barra_e6: number;

  sp_temp_1: number;
  sp_temp_2: number;
  sp_temp_3: number;
  sp_temp_4: number;
  sp_temp_5: number;
  sp_temp_6: number;
}
