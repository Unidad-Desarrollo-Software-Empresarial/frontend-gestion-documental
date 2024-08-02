export interface PracticasResponseDto {
    VINP_ID:              number;
    EST_CEDULA:           string;
    VINP_FECHA_INICIO:    Date;
    VINP_FECHA_FIN:       Date;
    VINP_HORAS_PRACTICAS: string;
    VINP_CAMPO_AMP:       number;
    VINP_CAMPO_ESP:       number;
    VINP_CAMPO_DET:       number;
    DOC_CEDULA:           string;
    VINP_LINK_EVIDENCIA:  string;
    VINP_ESTADO:          number;
    tipo:                 TipoResponseDto;
    especificacion:       EspecificacionResponseDto;
    empresa:              EmpresaResponseDto;
    sede:                 SedeResponseDto;
}

export interface EmpresaResponseDto {
    VINE_NOMBRE: string;
}

export interface EspecificacionResponseDto {
    VINESP_NOMBRE: string;
}

export interface SedeResponseDto {
    SEDE_NOMBRE: string;
}

export interface TipoResponseDto {
    VINPT_NOMBRE: string;
}


export interface PracticasCreateRequestDto {
    EST_CEDULA:           string;
    VINPT_ID:             number;
    VINESP_ID:            number;
    VINE_ID:              number;
    VINP_FECHA_INICIO:    string;
    VINP_FECHA_FIN:       string;
    VINP_HORAS_PRACTICAS: string;
    VINP_CAMPO_AMP:       number;
    VINP_CAMPO_ESP:       number;
    VINP_CAMPO_DET:       number;
    DOC_CEDULA:           string;
    VINP_LINK_EVIDENCIA:  string;
    SEDE_ID:              number;
    VINP_ESTADO:          number;
    // Only for updates
    VINP_ID?:              number;
}



export interface PracticasUpdateRequestDto extends Partial<PracticasCreateRequestDto> {}