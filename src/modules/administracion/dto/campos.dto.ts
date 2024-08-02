// Campos Amplios

export interface CampoAmplioResponseDto {
    VCCA_ID:          number;
    VCCA_CODIGO:      string;
    VCCA_DESCRIPCION: string;
    VCCA_ESTADO:      number;
}

// Campos Especificos

export interface CampoEspecificoResponseDto {
    VCCE_ID:          number;
    VCCA_ID:          number;
    VCCE_CODIGO:      string;
    VCCE_DESCRIPCION: string;
    VCCE_ESTADO:      number;
    campoAmplio:      CampoAmplioResponseDto;
}


// Campos Detallados

export interface CampoDetalladoResponseDto {
    VCCD_ID:          number;
    VCCE_ID:          number;
    VCCD_CODIGO:      string;
    VCCD_DESCRIPCION: string;
    VCCD_ESTADO:      number;
    campoEspecifico:  CampoEspecificoResponseDto;
}

