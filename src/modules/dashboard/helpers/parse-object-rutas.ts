import { type Router } from 'vue-router'
import type { RutaInterface } from '../dto/menu-rutas-response.dto'
import { addEstudiante } from '../../../indexed-db/estudiantes-db';
import { useApi } from '@/composables/use-api';
import { personalDb, type GlobalEstudianteResponse, type GlobalPersonalResponse, estudiantesDb } from '@/indexed-db';


export const parseObjectRutas = (rutas: RutaInterface[], router: Router) => {
    loadIndexedData(rutas)
    const existingRoutes = router.getRoutes().map((route) => route.name)
    rutas.map((ruta) => {
        if (!existingRoutes.includes(ruta.nombre)) {
            router.addRoute({
                path: ruta.path,
                name: ruta.ruta,
                component: () => import(/* @vite-ignore */ `../../../${ruta.component}`),
                meta: {
                    requiresAuth: true,
                    transition: 'fade',
                },

            })
        }
    })

    const rutasPadre = rutas.filter((ruta) => ruta.padre === 0)
    const rutasHijas = rutas.filter((ruta) => ruta.padre !== 0)
    const rutasParseadas = rutasPadre.map((rutaPadre) => {
        const rutasHijasParseadas = rutasHijas.filter((rutaHija) => rutaHija.padre === rutaPadre.id)
        return {
            ...rutaPadre,
            rutasHijas: rutasHijasParseadas
        }
    })
    return rutasParseadas
}

const loadIndexedData = async (rutas: RutaInterface[]) => {
    const arrNumber = rutas.map((r) => r.indexeddb)

    const dataString = JSON.stringify(rutas.map((r) => r.indexeddb));
    const currentHash = await hashData(dataString)

    // Obtener el hash almacenado
    const storedHash = localStorage.getItem('indexedDataHash');

    // Si los hashes coinciden, salir de la función
    if (storedHash === currentHash) {
        return;
    }
    localStorage.setItem('indexedDataHash', currentHash);


    const setIndexed = new Set(arrNumber)
    const arrIndexed = [...setIndexed]

    if (arrIndexed.includes(3)) {
        // const responseEstudiante = await useApi.get<GlobalEstudianteResponse[]>('global_estudiantes')
        // responseEstudiante.data.map((estudiante) => {
        //     estudiantesDb.addEstudiante(estudiante)
        // })

        useApi.get<GlobalEstudianteResponse[]>('global_estudiantes').then((estudiantes) => estudiantesDb.addAllEstudiantes(estudiantes.data) )

        // const responsePersonal = await useApi.get<GlobalPersonalResponse[]>('global_personal')
        // responsePersonal.data.map((personal) => {
        //     personalDb.addPersonal(personal)
        // })
        useApi.get<GlobalPersonalResponse[]>('global_personal').then( (personals) => personalDb.addAllPersonal(personals.data))

        return;

    }


    if (arrIndexed.includes(2)) {
        const response = await useApi.get<GlobalPersonalResponse[]>('global_personal')
        response.data.map((personal) => {
            personalDb.addPersonal(personal)
        })
    }


    if (arrIndexed.includes(1)) {
        const response = await useApi.get<GlobalEstudianteResponse[]>('global_estudiantes')
        response.data.map((estudiante) => {
            addEstudiante(estudiante)
        })
    }


}

export const removeRoutesOnLogout = (router: Router) => {
    router.getRoutes().forEach((route) => {
        const arr = ['dashboard', 'login', 'not-found']
        const isDeletable = arr.includes(route.name as string)

        if (!isDeletable) {
            router.removeRoute(route.name as string)
        }
    })
}


const hashData = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}