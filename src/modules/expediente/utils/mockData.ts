import type { Expediente } from '../types/expediente';

export const mockData: Expediente[] = [
  {
    numeracion: '1',
    serie: 'Serie A',
    subserie: 'Subserie A1',
    descripcion: 'Descripción de la subserie A1',
    origen: 'Digital',
    condiciones: 'Público',
    period: '2022-2023'
  },
  {
    numeracion: '2',
    serie: 'Serie B',
    subserie: 'Subserie B1',
    descripcion: 'Descripción de la subserie B1',
    origen: 'Físico',
    condiciones: 'Confidencial',
    period: '2022-2023'
  },
  {
    numeracion: '3',
    serie: 'Serie C',
    subserie: 'Subserie C1',
    descripcion: 'Descripción de la subserie C1',
    origen: 'Híbrido',
    condiciones: 'Público',
    period: '2022-2023'
  },
  {
    numeracion: '4',
    serie: 'Serie D',
    subserie: 'Subserie D1',
    descripcion: 'Descripción de la subserie D1',
    origen: 'Electrónico',
    condiciones: 'Reservado',
    period: '2023-2024'
  },
  // Agrega más datos según sea necesario
];
