<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h3 class="text-lg font-bold mb-4">Editar Ruta</h3>
        <form @submit.prevent="submitEdit">
          <label class="block text-gray-700 font-bold mb-2">Ruta</label>
          <input type="text" v-model="editRoute" class="p-2 border border-gray-300 rounded w-full text-sm" required />
          <div class="flex gap-4 mt-4">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded text-sm">
              Guardar
            </button>
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded text-sm">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  const props = defineProps<{
    isOpen: boolean
    route: string | null
  }>()
  
  const emit = defineEmits<{
    (event: 'close'): void
    (event: 'edit', updatedRoute: string): void
  }>()
  
  const editRoute = ref('')
  
  watch(() => props.route, (newRoute) => {
    if (newRoute) {
      editRoute.value = newRoute
    }
  })
  
  const closeModal = () => {
    emit('close')
  }
  
  const submitEdit = () => {
    emit('edit', editRoute.value)
  }
  </script>
  