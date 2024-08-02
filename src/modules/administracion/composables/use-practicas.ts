import { useMutation, useQuery } from "@tanstack/vue-query"
import type { PracticasCreateRequestDto, PracticasUpdateRequestDto } from "../dto/practica"
import { useApi } from "@/composables/use-api"


export const usePostPractica = () => {
    try {
        const mutation = useMutation({
            mutationFn: async (data: PracticasCreateRequestDto) => {
                const response = await useApi.post('vinculacion/practicas', data)
                return response.data
            }
        })
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const usePutPractica = () => {
    try {
        const mutation = useMutation({
            mutationFn: async (data: PracticasUpdateRequestDto) => {
                const {VINP_ID: id, ...obj} = data
                const response = await useApi.put(`vinculacion/practicas/${id}`, obj)
                return response.data
        }})
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetPracticas = () => {
    try {
        const query = useQuery({
            queryKey: ['practicas'],
            queryFn: async () => {
                const response = await useApi.get('vinculacion/practicas')
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetPracticaById = (id: number) => {
    try {
        const query = useQuery({
            queryKey: ['practica', id],
            queryFn: async () => {
                const response = await useApi.get(`vinculacion/practicas/${id}`)
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetPracticaByIdNoQuery = async (id: number) => {
    try {
        const response = await useApi.get(`vinculacion/practicas/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}