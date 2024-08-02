export interface VinculacionesEspecificacionesDto {
    VINESP_ID?: number
    VINESP_NOMBRE: string
    VINESP_ESTADO: number
}

export const objVinculacionesEspecificacionDtoEmpty: VinculacionesEspecificacionesDto = {
    VINESP_ID: 0,
    VINESP_NOMBRE: '',
    VINESP_ESTADO: 0
}
