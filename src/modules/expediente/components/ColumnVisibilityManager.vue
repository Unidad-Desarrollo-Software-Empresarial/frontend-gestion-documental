<template>
  <div class="relative inline-block text-left">
    <button 
      @click="toggleDropdown"
      class="inline-flex w-full justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Gestionar Columnas
      <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menú -->
    <div 
      v-show="isOpen" 
      class="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      @click="closeDropdown"
    >
      <ul class="py-1 text-sm text-gray-700">
        <li 
          v-for="(column, index) in columns" 
          :key="index"
          class="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="toggleColumnVisibility(index)"
        >
          <span>{{ column.label }}</span>
          <span :class="column.visible ? 'text-green-500' : 'text-red-500'">
            {{ column.visible ? 'Visible' : 'Oculto' }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  columns: { name: string; label: string; visible: boolean }[];
}>();

const emit = defineEmits<{ (event: 'update-columns', updatedColumns: any[]): void }>();

const isOpen = ref(false);
const columns = ref(props.columns);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const toggleColumnVisibility = (index: number) => {
  columns.value[index].visible = !columns.value[index].visible;
  emit('update-columns', columns.value);
};
</script>

<style scoped>
/* Añade estilos específicos si es necesario */
</style>
