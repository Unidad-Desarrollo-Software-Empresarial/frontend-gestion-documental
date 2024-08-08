<template>
  <div class="flex items-center space-x-3">
    <!-- Etiqueta fuera del selector -->
    <label for="period-selector" class="text-gray-700 font-semibold text-sm md:text-base">Seleccionar Período:</label>
    <!-- Contenedor del Dropdown -->
    <div class="relative inline-block text-left" ref="dropdown">
      <button 
        @click="toggleDropdown" 
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ selectedPeriods.length ? selectedPeriods.join(', ') : 'Seleccionar Período' }} <!-- Muestra los períodos seleccionados -->
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
            @click="selectPeriod('Todos')"
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <span>Todos</span>
          </li>
          <li 
            v-for="(period, index) in periods" 
            :key="index"
            @click="selectPeriod(period)"
            :class="{ 'bg-gray-100 dark:bg-gray-700': selectedPeriods.includes(period) }"
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <span>{{ period }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  periods: string[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update-modelValue', periods: string[]): void;
}>();

const selectedPeriods = ref<string[]>(props.modelValue);
const isOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const updateSelectedPeriods = (newSelection: string[]) => {
  // If the new selection includes all periods (excluding "Todos"), select "Todos"
  if (newSelection.length === props.periods.length) {
    selectedPeriods.value = ['Todos'];
  } else {
    selectedPeriods.value = newSelection;
  }

  // Emit the updated selection
  emit('update-modelValue', selectedPeriods.value);
};

const selectPeriod = (period: string) => {
  if (period === 'Todos') {
    selectedPeriods.value = ['Todos'];
  } else {
    // If "Todos" is selected, deselect it
    if (selectedPeriods.value.includes('Todos')) {
      selectedPeriods.value = [period];
    } else {
      // Add or remove the selected period
      const newSelection = selectedPeriods.value.includes(period)
        ? selectedPeriods.value.filter(p => p !== period)
        : [...selectedPeriods.value, period];

      updateSelectedPeriods(newSelection);
    }
  }

  // Close the dropdown
  isOpen.value = false;
};

// Watch for changes in the props.modelValue to keep the selectedPeriods in sync
watch(() => props.modelValue, (newValue) => {
  selectedPeriods.value = newValue;
});

// Handle click outside of the dropdown to close it
const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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
