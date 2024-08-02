import { useApi } from "@/composables/use-api"
import { useMutation, useQuery } from "@tanstack/vue-query"
import type { CartaConvenioDto } from "../dto/cartas-convenios.dto"


export const useGetConveniosCartas = () => {
    try {
        const query = useQuery({
            queryKey: ['convenios-cartas'],
            queryFn: async () => {
                const response = await useApi.get('vinculacion/convenios-cartas')
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const usePostConvenioCarta = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: CartaConvenioDto) => {
                    const response = await useApi.post('vinculacion/convenios-cartas', data)
                    return response.data
                },
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const usePutConvenioCarta = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: CartaConvenioDto) => {
                    const {VINE_ID: id, ...obj} = data
                    const response = await useApi.put(`vinculacion/convenios-cartas/${id}`, obj)
                    return response.data
                },
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetConvenioCartaByIdNoQuery = async (id: number) => {
    try {
        const response = await useApi.get(`vinculacion/convenios-cartas/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}