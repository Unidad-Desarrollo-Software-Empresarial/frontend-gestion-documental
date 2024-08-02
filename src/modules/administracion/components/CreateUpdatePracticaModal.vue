<template>
    <div v-if="open"
        class="fixed top-0 left-0 sm:ml-32 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
        @click="closeModal">

        <div class="bg-white rounded shadow-lg max-w-[400px] max-h-[600px] overflow-auto" @click.stop>
            <div class="px-4 py-2 flex justify-between items-center">
                <h2 class="text-xl">Crear nueva practica</h2>
                <button @click="closeModal"
                    class="bg-red-400 rounded-xl px-3 py-2 text-xs text-slate-100">Cerrar</button>
            </div>
            <div class="p-4">
                <form @submit.prevent="onSubmit">

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="cedulaEstudiante">Estudiante Cedula:</label>
                        <input v-model="practica.EST_CEDULA" id="cedulaEstudiante" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <div class="absolute max-h-[300px] overflow-auto">
                            <ul v-if="hiddenOptionsEstudiante" class="relative z-50 bg-white border rounded-xl">
                                <li v-for="estudiante in optionsEstudiante" :key="estudiante.id"
                                    @click="selectedEstudiante(estudiante)"
                                    class="p-1 hover:bg-black/5 hover:cursor-pointer">{{ estudiante.APELLIDOS }}
                                    {{ estudiante.NOMBRES }}</li>
                            </ul>
                        </div>
                        <span class="text-gray-500 text-sm font-semibold">{{ estudianteNameSelected }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="cedulaDocente">Docente Cedula:</label>
                        <input v-model="practica.DOC_CEDULA" id="cedulaDocente" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <div class="absolute max-h-[300px] overflow-auto">
                            <ul class="relative z-60 bg-white border rounded-xl">
                                <li v-for="personal in optionsPersonal" :key="personal.id"
                                    @click="selectedPersonal(personal)"
                                    class="p-1 hover:bg-black/5 hover:cursor-pointer">{{
                                        personal.LDOC_NOMBRE }}
                                </li>
                            </ul>
                        </div>
                        <span class="text-gray-500 text-md font-semibold">{{ personalNameSelected }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionPracticaTipo">Vinculacion Practica Tipo:</label>
                        <select v-model="practica.VINPT_ID"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in queryPracticaTipo.data.value" :key="item.VINPT_ID"
                                :value="item.VINPT_ID">
                                {{ item.VINPT_NOMBRE }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionEspecificacion">Vinculacion Especificacion:</label>
                        <select v-model="practica.VINESP_ID"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in queryEspecificaciones.data.value" :key="item.VINESP_ID"
                                :value="item.VINESP_ID">
                                {{ item.VINESP_NOMBRE }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionEmpresa">Vinculacion Empresa:</label>
                        <select v-model="practica.VINE_ID"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in queryEmpresas.data.value" :key="item.VINE_ID" :value="item.VINE_ID">
                                {{ item.VINE_NOMBRE }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionFechaInicio">Vinculacion Fecha Inicio:</label>
                        <input v-model="practica.VINP_FECHA_INICIO" id="vinculacionFechaInicio" type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionFechaFin">Vinculacion Fecha Fin:</label>
                        <input v-model="practica.VINP_FECHA_FIN" id="vinculacionFechaFin" type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionHorasPracticas">Vinculacion Horas Practicas:</label>
                        <input v-model="practica.VINP_HORAS_PRACTICAS" id="vinculacionHorasPracticas" type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionCampoAmplio">Vinculacion Campo amplio de
                            practica:</label>
                        <select v-model="practica.VINP_CAMPO_AMP"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in queryCamposAmplios.data.value" :key="item.VCCA_CODIGO"
                                :value="item.VCCA_ID">
                                <span class="font-bold text-sm">{{ item.VCCA_CODIGO }}: </span>
                                <span class="">{{ item.VCCA_DESCRIPCION }}</span>
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionCampoEspecifico">Vinculacion Campo especifico de
                            practica:</label>
                        <select v-model="practica.VINP_CAMPO_ESP"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in camposEspecificosByCampoAmplio" :key="item.VCCE_CODIGO"
                                :value="item.VCCE_ID">
                                <span class="font-bold text-sm">{{ item.VCCE_CODIGO }}: </span>
                                <span class="">{{ item.VCCE_DESCRIPCION }}</span>
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionCampoDetallado">Vinculacion Campo detallado de
                            practica:</label>
                        <select v-model="practica.VINP_CAMPO_DET"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in camposDetalladosByCampoEspecifico" :key="item.VCCD_CODIGO"
                                :value="item.VCCD_ID">
                                <span class="font-bold text-sm">{{ item.VCCD_CODIGO }}: </span>
                                <span class="">{{ item.VCCD_DESCRIPCION }}</span>
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="vinculacionPracticaEvidencia">Link Evidencia:</label>
                        <!-- Drag and drop -->
                        <div class="flex items-center justify-center w-full mb-4">
                            <label for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                            class="font-semibold">Click para subir archivo</span> o arrastre y suelte
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Se aceptan unicamente archivos
                                        .pdf
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div>
                        <!--  -->
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="sedeId">Sede:</label>
                        <select v-model="practica.SEDE_ID"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Seleccione una opcion...</option>
                            <option v-for="item in queryIntersedes.data.value" :key="item.SEDE_ID"
                                :value="item.SEDE_ID">
                                <span class="font-bold text-sm">{{ item.SEDE_NOMBRE }}</span>
                            </option>
                        </select>
                    </div>

                    <div class="mb-4" v-if="props.itemUpdate">
                        <!-- Agregar slider para actualizar el estado -->
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="stateCorp">Estado</label>
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="practica.VINP_ESTADO" class="sr-only peer"
                                :checked="practica.VINP_ESTADO === 1">
                            <div
                                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <span
                                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Deshabilitar/Habilitar</span>
                        </label>
                        <!--  -->
                    </div>
                    <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded">{{ !!props.itemUpdate ?
                        'Actualizar' : 'Crear' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { estudiantesDb, personalDb, type GlobalEstudianteResponse, type GlobalPersonalResponse } from '@/indexed-db';
import { useGetIntersedesQuery } from '@/modules/internacionalizacion/composables/use-intersedes';

import type { PracticasCreateRequestDto } from '../dto/practica';
import type { CampoDetalladoResponseDto, CampoEspecificoResponseDto } from '../dto/campos.dto';


import { useGetPracticaByIdNoQuery, usePostPractica, usePutPractica } from '../composables/use-practicas';
import { useGetTipoPracticasVinculaciones } from '../composables/use-tipo-vinculaciones';
import { useGetVinculacionEspecificaciones } from '../composables/use-especificaciones';
import { useGetEmpresas } from '../composables/use-empresas';
import { useGetCamposAmplios, useGetCamposDetalladosByIdCampoEspecificoNoQuery, useGetCamposEspecificosByIdCampoAmplioNoQuery } from '../composables/use-campos';

const queryPracticaTipo = useGetTipoPracticasVinculaciones()
const queryEspecificaciones = useGetVinculacionEspecificaciones();
const queryEmpresas = useGetEmpresas()
const queryCamposAmplios = useGetCamposAmplios()
const queryIntersedes = useGetIntersedesQuery()

const queryClient = useQueryClient()

const practicaEmpty = {
    EST_CEDULA: '',
    VINPT_ID: 0,
    VINESP_ID: 0,
    VINE_ID: 0,
    VINP_FECHA_INICIO: '',
    VINP_FECHA_FIN: '',
    VINP_HORAS_PRACTICAS: '',
    VINP_CAMPO_AMP: 0,
    VINP_CAMPO_ESP: 0,
    VINP_CAMPO_DET: 0,
    DOC_CEDULA: '',
    VINP_LINK_EVIDENCIA: '',
    SEDE_ID: 0,
    VINP_ESTADO: 1,
}



const practica = ref<PracticasCreateRequestDto>(practicaEmpty);

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    itemUpdate: {
        type: Number,
        default: null,
        required: false
    },
})

watch(() => props.itemUpdate, async (value) => {
    if (value) {
        practica.value = await useGetPracticaByIdNoQuery(props.itemUpdate)
    } else {
        practica.value = practicaEmpty
    }
})


const emit = defineEmits(['close'])

const mutationCreate = usePostPractica()
const mutationUpdate = usePutPractica()

const addPractica = async () => {
    console.log(practica);
    await mutationCreate.mutateAsync(practica.value)
    if (mutationCreate.isSuccess) {
        emit('close')
        queryClient.invalidateQueries({ queryKey: ['practicas'] })
    } else {
        alert('Error al crear la practica')
    }
}

const updatePractica = async () => {
    practica.value.VINP_ID = props.itemUpdate
    practica.value.VINP_ESTADO = practica.value.VINP_ESTADO ? 1 : 0
    await mutationUpdate.mutateAsync(practica.value)
    if (mutationUpdate.isSuccess) {
        emit('close')
        queryClient.invalidateQueries({ queryKey: ['practicas'] })
    } else {
        alert('Error al actualizar la practica')
    }

}

const onSubmit = () => {
    if (props.itemUpdate) {
        updatePractica()
    } else {
        addPractica()
    }
}

const closeModal = () => {
    hiddenOptionsEstudiante.value = false;
    optionsEstudiante.value = []
    estudianteNameSelected.value = ""
    hiddenOptionsPersonal.value = false;
    optionsPersonal.value = [];
    personalNameSelected.value = "";

    practica.value = practicaEmpty
    emit('close')
}


// ======================================================================================

const optionsEstudiante = ref<GlobalEstudianteResponse[]>([]);
const estudianteNameSelected = ref<string>()
const hiddenOptionsEstudiante = ref<boolean>(false)


watch(() => practica.value.EST_CEDULA, async (val: string) => {
    if (val.length > 3) {
        hiddenOptionsEstudiante.value = true
        optionsEstudiante.value = await estudiantesDb.searchEstudiante(val);
    }
    if (val.length <= 3 || val.length === 10) {
        optionsEstudiante.value = [];
        hiddenOptionsEstudiante.value = false
    }
});

const selectedEstudiante = (selectedEst: GlobalEstudianteResponse) => {
    practica.value.EST_CEDULA = selectedEst.IDENTIFICACION;
    optionsEstudiante.value = [];
    estudianteNameSelected.value = `${selectedEst.APELLIDOS} ${selectedEst.NOMBRES}`;
    hiddenOptionsEstudiante.value = false
}
// ===================================================================================

const optionsPersonal = ref<GlobalPersonalResponse[]>()
const personalNameSelected = ref<string>("")
const hiddenOptionsPersonal = ref<boolean>(false)

watch(() => practica.value.DOC_CEDULA, async (val: string) => {
    if (val.length > 3) {
        hiddenOptionsPersonal.value = true
        optionsPersonal.value = await personalDb.searchPersonal(val);
    }
    console.log(optionsPersonal.value);

    if (val.length <= 3 || val.length === 10) {
        optionsPersonal.value = []
        hiddenOptionsPersonal.value = false
    }
})

const selectedPersonal = (selectedPers: GlobalPersonalResponse) => {
    practica.value.DOC_CEDULA = selectedPers.LDOC_CEDULA
    optionsPersonal.value = [];
    personalNameSelected.value = `${selectedPers.LDOC_NOMBRE}`
    hiddenOptionsPersonal.value = false
}
// ==================================================================================
const camposEspecificosByCampoAmplio = ref<CampoEspecificoResponseDto[]>([])
watch(() => practica.value.VINP_CAMPO_AMP, async (val) => {
    if (val !== 0) {
        camposEspecificosByCampoAmplio.value = await useGetCamposEspecificosByIdCampoAmplioNoQuery(practica.value.VINP_CAMPO_AMP)
    }
})
// ===========================
const camposDetalladosByCampoEspecifico = ref<CampoDetalladoResponseDto[]>([])
watch(() => practica.value.VINP_CAMPO_ESP, async (val) => {
    if (val != 0) {
        camposDetalladosByCampoEspecifico.value = await useGetCamposDetalladosByIdCampoEspecificoNoQuery(practica.value.VINP_CAMPO_ESP)
    }
})

</script>

<style scoped></style>