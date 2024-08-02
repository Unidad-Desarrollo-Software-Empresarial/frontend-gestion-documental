<template>
  <!-- Main modal -->
  <div
    v-if="open"
    class="fixed top-0 left-0 sm:ml-16 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    @click="closeModal"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="bg-white rounded shadow-lg max-w-[900px] min-w-[550px] max-h-[700px] overflow-auto" @click.stop>
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ itemUpdate === null ? 'Agregar especificación' : 'Actualizar especificación' }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            @click="closeModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="onSubmit">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <!--  -->
            <div class="col-span-2">
              <label for="especificacion-nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nombre de especificación</label
              >
              <input
                v-model="especificacionItem.VINESP_NOMBRE"
                type="text"
                name="especificacion-nombre"
                id="especificacion-nombre"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Ingrese la espeficicación..."
                required
              />
            </div>
            <!--  -->

            <!--  -->
            <label class="inline-flex items-center cursor-pointer">
              <input
                v-model="especificacionItem.VINESP_ESTADO"
                type="checkbox"
                class="sr-only peer"
                :checked="especificacionItem.VINESP_ESTADO === 1 ? true : false"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                especificacionItem.VINESP_ESTADO || especificacionItem.VINESP_ESTADO === 1 ? 'Habilitado' : 'Deshabilitado'
              }}</span>
            </label>
            <!--  -->
          </div>

          <button
            type="submit"
            class="text-white gap-2 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              v-if="itemUpdate === null"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <p>{{ itemUpdate === null ? 'Agregar especificación' : 'Actualizar especificación' }}</p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { objVinculacionesEspecificacionDtoEmpty, type VinculacionesEspecificacionesDto } from '../dto/especificaciones.dto'
import {
  useGetVinculacionesEspecificacionByIdNoQuery,
  usePostVinculacionesEspecificacion,
  usePutVinculacionesEspecificacion
} from '../composables/use-especificaciones'

const queryClient = useQueryClient()

const especificacionItem = ref<VinculacionesEspecificacionesDto>(objVinculacionesEspecificacionDtoEmpty)

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  itemUpdate: {
    type: Number,
    default: null,
    required: false
  }
})

watch(
  () => props.itemUpdate,
  async (value) => {
    if (value) {
      especificacionItem.value = await useGetVinculacionesEspecificacionByIdNoQuery(props.itemUpdate)
    } else {
      especificacionItem.value = objVinculacionesEspecificacionDtoEmpty
    }
  }
)

const emit = defineEmits(['close'])

const mutationCreate = usePostVinculacionesEspecificacion()
const mutationUpdate = usePutVinculacionesEspecificacion()

const addEspecificacion = async () => {
  await mutationCreate.mutateAsync(especificacionItem.value)
  if (mutationCreate.isSuccess) {
    emit('close')
    queryClient.invalidateQueries({ queryKey: ['empresas'] })
  } else {
    alert('Error al crear la empresa')
  }
}

const updateEspecificacion = async () => {
  especificacionItem.value.VINESP_ID = props.itemUpdate
  especificacionItem.value.VINESP_ESTADO = especificacionItem.value.VINESP_ESTADO ? 1 : 0
  await mutationUpdate.mutateAsync(especificacionItem.value)
  if (mutationUpdate.isSuccess) {
    emit('close')
    queryClient.invalidateQueries({ queryKey: ['vinculacion-especificaciones'] })
  } else {
    alert('Error al crear la empresa')
  }
}

const onSubmit = () => {
  especificacionItem.value.VINESP_ID = props.itemUpdate
  especificacionItem.value.VINESP_ESTADO = especificacionItem.value.VINESP_ESTADO ? 1 : 0
  if (props.itemUpdate === null) {
    // create
    addEspecificacion()
  } else {
    // update
    updateEspecificacion()
  }
}

const closeModal = () => {
  especificacionItem.value = objVinculacionesEspecificacionDtoEmpty
  emit('close')
}
</script>

<style scoped></style>
