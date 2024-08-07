<template>
  <div class="relative inline-block text-left">
    <!-- Botón de Activación del Dropdown -->
    <button 
      @click="toggleDropdown"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Gestionar Columnas
      <svg 
        class="w-2 h-2 ml-5 transition-transform duration-300" 
        :class="{'rotate-180': isOpen}" 
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

    <!-- Dropdown menú -->
    <div 
      v-show="isOpen" 
      class="absolute left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <ul class="py-1 text-sm text-gray-700">
        <li 
          v-for="(column, index) in columns" 
          :key="index"
          class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  columns: { name: string; label: string; visible: boolean }[];
}>();

const emit = defineEmits<{ (event: 'update-columns', updatedColumns: any[]): void }>();

const isOpen = ref(false);
const columns = ref(props.columns);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleColumnVisibility = (index: number) => {
  columns.value[index].visible = !columns.value[index].visible;
  emit('update-columns', columns.value);
};

// Cierra el dropdown cuando se hace clic fuera del componente
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isOpen.value = false;
  }
};

document.addEventListener('click', handleClickOutside);

watch(() => props.columns, (newColumns) => {
  columns.value = newColumns;
}, { deep: true });

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Flecha giratoria */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Asegura que el menú esté alineado desde el botón */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  left: 0; /* Alinea el menú con la izquierda del contenedor relativo */
}
</style>
