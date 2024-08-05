<template>
  <div class="relative inline-block text-left">
    <button @click="toggleDropdown" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      Toggle Column
    </button>
    <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div v-for="column in columns" :key="column.head" class="p-2 flex items-center">
        <input 
          type="checkbox" 
          :id="column.head" 
          v-model="column.isShowing" 
          class="form-checkbox h-4 w-4 text-blue-600"
        />
        <label :for="column.head" class="ml-2 text-sm text-gray-700">{{ column.head }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  columns: { head: string; isShowing: boolean }[];
  options: string[];
}>();

const emit = defineEmits<{
  (event: 'update:columns', columns: { head: string; isShowing: boolean }[]): void;
}>();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const updatedColumns = () => {
  emit('update:columns', props.columns);
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
