import { useApi } from "@/composables/use-api"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { type VinculacionesEspecificacionesDto } from '../dto/especificaciones.dto';

export const useGetVinculacionEspecificaciones = () => {
    try {
        const query = useQuery({
            queryKey: ['vinculacion-especificaciones'],
            queryFn: async () => {
                const response = await useApi.get<VinculacionesEspecificacionesDto[]>('vinculacion/especificaciones')
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}


export const usePostVinculacionesEspecificacion = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: VinculacionesEspecificacionesDto) => {
                    const response = await useApi.post('vinculacion/especificaciones', data)
                    return response.data
                },
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const usePutVinculacionesEspecificacion = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: VinculacionesEspecificacionesDto) => {
                    const { VINESP_ID: id, ...obj } = data
                    const response = await useApi.put(`vinculacion/especificaciones/${id}`, obj)
                    return response.data
                },
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetVinculacionesEspecificacionByIdNoQuery = async (id: number) => {
    try {
        const response = await useApi.get(`vinculacion/especificaciones/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}