import { useApi } from "@/composables/use-api"
import { useQuery } from "@tanstack/vue-query"
import type { CampoAmplioResponseDto, CampoDetalladoResponseDto, CampoEspecificoResponseDto } from "../dto/campos.dto"


export const useGetCamposAmplios = () => {
    try {
        const query = useQuery({
            queryKey: ['campos-amplios'],
            queryFn: async () => {
                const response = await useApi.get<CampoAmplioResponseDto[]>('vinculacion/campos-amplios')
                return response.data
            }
        })

        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetCampoAmplioById = (id: number) => {
    try {
        const query = useQuery({
            queryKey: ['campo-amplio', id],
            queryFn: async () => {
                const response = await useApi.get<CampoAmplioResponseDto>(`vinculacion/campos-amplios/${id}`)
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetCampoAmplioByIdNoQuery = async (id: number) => {
    try {
        const response = await useApi.get<CampoAmplioResponseDto>(`vinculacion/campos-amplios/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

// =======================


export const useGetCamposEspecificosByIdCampoAmplioNoQuery = async (id: number) => {
    try {
        const response = await useApi.get<CampoEspecificoResponseDto[]>(`vinculacion/campos-especificos/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}


export const useGetCamposDetalladosByIdCampoEspecificoNoQuery = async (id: number) => {
    try {
        const response = await useApi.get<CampoDetalladoResponseDto[]>(`vinculacion/campos-detallados/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}
