import { useApi } from '@/composables/use-api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { EmpresaDto } from '../dto/empresa.dto'

export const usePostEmpresa = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: EmpresaDto) => {
                    const response = await useApi.post('vinculacion/empresas', data)
                    return response.data
                },
                
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const usePutEmpresa = () => {
    try {
        const mutation = useMutation(
            {
                mutationFn: async (data: EmpresaDto) => {
                    const {VINE_ID: id, ...obj} = data
                    const response = await useApi.put(`vinculacion/empresas/${id}`, obj)
                    return response.data
                },
            },
        )
        return mutation
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetEmpresas = () => {
    try {
        const query = useQuery({
            queryKey: ['empresas'],
            queryFn: async () => {
                const response = await useApi.get<EmpresaDto[]>('vinculacion/empresas')
                return response.data
            }
        })

        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetEmpresaById = (id: number) => {
    try {
        const query = useQuery({
            queryKey: ['empresa', id],
            queryFn: async () => {
                const response = await useApi.get<EmpresaDto>(`vinculacion/empresas/${id}`)
                return response.data
            }
        })
        return query
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const useGetEmpresaByIdNoQuery = async (id: number) => {
    try {
        const response = await useApi.get<EmpresaDto>(`vinculacion/empresas/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}