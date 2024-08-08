export interface Expediente {
  numeracion: string;
  serie: string;
  subserie: string;
  descripcion: string;
  origen: 'Físico' | 'Electrónico' | 'Digital' | 'Híbrido';
  condiciones: 'Público' | 'Confidencial' | 'Reservado' | 'Privado';
  period: string;
}
