<template>
  <div v-if="isVisible"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded shadow-lg max-w-[500px] min-w-[350px] max-h-[600px] overflow-auto" @click.stop>
          <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Modificar Expediente
                      </h3>
                      <button @click="closeModal" type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                          <span class="sr-only">Cerrar modal</span>
                      </button>
                  </div>
                  <form class="p-4 md:p-5" @submit.prevent="onSubmit">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                          <div class="col-span-2">
                              <label for="numeracion"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numeración</label>
                              <input v-model="expediente.numeracion" id="numeracion" type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                          </div>
                          <div class="col-span-2">
                              <label for="serie"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serie</label>
                              <input v-model="expediente.serie" id="serie" type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                          </div>
                          <div class="col-span-2">
                              <label for="subserie"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subserie</label>
                              <input v-model="expediente.subserie" id="subserie" type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                          </div>
                          <div class="col-span-2">
                              <label for="descripcion"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                              <input v-model="expediente.descripcion" id="descripcion" type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                          </div>
                          <div class="col-span-2">
                              <label for="origen"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Origen</label>
                              <select id="origen" v-model="expediente.origen"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                  <option value="Físico">Físico</option>
                                  <option value="Electrónico">Electrónico</option>
                                  <option value="Digital">Digital</option>
                                  <option value="Híbrido">Híbrido</option>
                              </select>
                          </div>
                          <div class="col-span-2">
                              <label for="condiciones"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condiciones</label>
                              <select id="condiciones" v-model="expediente.condiciones"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                  <option value="Público">Público</option>
                                  <option value="Confidencial">Confidencial</option>
                                  <option value="Reservado">Reservado</option>
                                  <option value="Privado">Privado</option>
                              </select>
                          </div>
                          <div class="col-span-2">
                              <label for="period"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Período</label>
                              <input v-model="expediente.period" id="period" type="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                          </div>
                      </div>
                      <button type="submit"
                          class="flex text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-auto dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800">
                          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                              viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                  d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
                          </svg>
                          &nbsp;&nbsp;Actualizar
                      </button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Expediente } from '../types/expediente';

const props = defineProps({
  isVisible: {
      type: Boolean,
      default: false
  },
  expediente: {
      type: Object as () => Expediente | null,
      default: null
  }
});

const emit = defineEmits(['update:expediente', 'close']);

const expediente = ref<Expediente | null>(props.expediente);

watch(() => props.expediente, (newValue) => {
  expediente.value = newValue;
});

const closeModal = () => {
  emit('close');
};

const onSubmit = () => {
  if (expediente.value) {
      emit('update:expediente', expediente.value);
  }
  closeModal();
};
</script>

<style>
.text-custom-color {
  color: rgb(169, 222, 243); /* o #A9DEF3 */
}
.bg-custom-color {
  background-color: rgb(169, 222, 243); /* o #A9DEF3 */
}
.bg-custom-color:hover {
  background-color: rgb(150, 200, 230); /* Color ligeramente diferente para hover */
}
</style>
