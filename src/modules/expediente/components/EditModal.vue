<template>
  <div v-if="isVisible && expediente" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Editar Expediente</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="numeracion" class="block text-sm font-medium text-gray-700">Numeración</label>
          <input
            id="numeracion"
            v-model="formData.numeracion"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="serie" class="block text-sm font-medium text-gray-700">Serie Documental</label>
          <input
            id="serie"
            v-model="formData.serie"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="subserie" class="block text-sm font-medium text-gray-700">Subserie Documental</label>
          <input
            id="subserie"
            v-model="formData.subserie"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción Subserie Documental</label>
          <input
            id="descripcion"
            v-model="formData.descripcion"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="origen" class="block text-sm font-medium text-gray-700">Origen</label>
          <select
            id="origen"
            v-model="formData.origen"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="Físico">Físico</option>
            <option value="Electrónico">Electrónico</option>
            <option value="Digital">Digital</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="condiciones" class="block text-sm font-medium text-gray-700">Condiciones de Acceso</label>
          <select
            id="condiciones"
            v-model="formData.condiciones"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="Público">Público</option>
            <option value="Confidencial">Confidencial</option>
            <option value="Reservado">Reservado</option>
            <option value="Privado">Privado</option>
          </select>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { Expediente } from '../types/expediente';

const props = defineProps<{
  isVisible: boolean;
  expediente: Expediente | null;
}>();

const emit = defineEmits<{
  (event: 'update:expediente', expediente: Expediente): void;
  (event: 'close'): void;
}>();

const formData = ref<Expediente>({
  numeracion: '',
  serie: '',
  subserie: '',
  descripcion: '',
  origen: 'Físico',
  condiciones: 'Público',
  period: ''
});

watch(() => props.expediente, (newExpediente) => {
  if (newExpediente) {
    formData.value = newExpediente;
  }
});

const submitForm = () => {
  if (formData.value) {
    emit('update:expediente', formData.value);
    emit('close');
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Añade estilos si es necesario */
</style>
