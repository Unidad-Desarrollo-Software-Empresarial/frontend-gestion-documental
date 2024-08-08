<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <!-- Modal content -->
      <div class="relative w-full max-w-md max-h-full mx-4">
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Editar Expediente
            </h3>
            <button
              type="button"
              class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 dark:hover:bg-gray-600 dark:hover:text-white"
              @click="$emit('close')"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="submitForm" class="p-4 space-y-4 md:p-5">
            <div>
              <label for="serie" class="block text-sm font-medium text-gray-900 dark:text-white">Serie Documental</label>
              <input
                v-if="formData"
                v-model="formData.serie"
                type="text"
                id="serie"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="subserie" class="block text-sm font-medium text-gray-900 dark:text-white">Subserie Documental</label>
              <input
                v-if="formData"
                v-model="formData.subserie"
                type="text"
                id="subserie"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="descripcion" class="block text-sm font-medium text-gray-900 dark:text-white">Descripción Subserie Documental</label>
              <input
                v-if="formData"
                v-model="formData.descripcion"
                type="text"
                id="descripcion"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="origen" class="block text-sm font-medium text-gray-900 dark:text-white">Origen</label>
              <input
                v-if="formData"
                v-model="formData.origen"
                type="text"
                id="origen"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="condiciones" class="block text-sm font-medium text-gray-900 dark:text-white">Condiciones de Acceso</label>
              <input
                v-if="formData"
                v-model="formData.condiciones"
                type="text"
                id="condiciones"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="$emit('close')"
                class="text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white rounded-lg px-4 py-2.5 text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-sm font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Expediente } from '../types/expediente'

const props = defineProps<{
  isVisible: boolean
  expediente: Expediente | null
}>()

const emit = defineEmits(['update:expediente', 'close'])

const formData = ref<Expediente | null>(null)

watch(
  () => props.expediente,
  (newExpediente) => {
    formData.value = { ...newExpediente! }
  },
  { immediate: true }
)

const submitForm = () => {
  if (formData.value) {
    emit('update:expediente', formData.value)
    emit('close')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
