<template>
  <div class="flex items-center space-x-3">
    <!-- Etiqueta fuera del selector -->
    <label for="period-selector" class="text-gray-700 font-semibold text-sm md:text-base">Seleccionar Período:</label>
    <!-- Contenedor del Dropdown -->
    <div class="relative inline-block text-left">
      <button 
        @click="toggleDropdown" 
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ selectedPeriod }} <!-- Muestra el texto seleccionado o un texto por defecto -->
        <svg 
          class="w-2 h-2 ml-5 transition-transform duration-300" 
          :class="{ 'rotate-180': isOpen }" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 10 6"
        >
          <path 
            stroke="currentColor" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      
      <!-- Contenido del Dropdown -->
      <div 
        v-show="isOpen" 
        class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10"
      >
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li 
            v-for="(period, index) in periods" 
            :key="index"
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            @click="selectPeriod(period)"
          >
            <span>{{ period }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  periods: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update-modelValue', period: string): void;
}>();

const selectedPeriod = ref(props.modelValue);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectPeriod = (period: string) => {
  selectedPeriod.value = period;
  emit('update-modelValue', period);
  isOpen.value = false;
};

// Watch for changes in the props.modelValue to keep the selectedPeriod in sync
watch(() => props.modelValue, (newValue) => {
  selectedPeriod.value = newValue;
});
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
