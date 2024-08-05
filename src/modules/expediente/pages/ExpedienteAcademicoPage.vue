<template>
  <DashboardLayout>
    <div class="p-4 space-y-4">
      <!-- Selector de periodo -->
      <CustomPeriodSelector 
        :periods="periods" 
        v-model:modelValue="selectedPeriod" 
        @update:modelValue="updatePeriod" 
      />
      
      <!-- Acordeón que contiene la tabla de datos -->
      <CustomAccordion title="Detalles del Expediente">
        <CustomDataTable
          :data="paginatedItems" 
          :columns="columns"
          :actionsVisible="true"
          @edit-item="editItem"
        />
        
        <!-- Paginación -->
        <div class="flex justify-between items-center mt-4">
          <button @click="previousPage" :disabled="currentPage <= 1" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Anterior
          </button>
          <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Siguiente
          </button>
        </div>
      </CustomAccordion>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import CustomAccordion from '../components/CustomAccordion.vue';
import CustomDataTable from '../components/CustomDataTable.vue';
import CustomPeriodSelector from '../components/CustomPeriodSelector.vue';
import { mockData } from '../utils/mockData';
import type { Expediente } from '../types/expediente';
import usePagination from '../composables/usePagination';

// Datos mock y opciones
const periods = ['2022-2023', '2023-2024', '2024-2025'];
const selectedPeriod = ref(periods[0]);
const data = ref<Expediente[]>(mockData);

// Definición de columnas de la tabla
const columns = [
  { name: 'numeracion', label: 'Numeración', visible: true },
  { name: 'serie', label: 'Serie Documental', visible: true },
  { name: 'subserie', label: 'Subserie Documental', visible: true },
  { name: 'descripcion', label: 'Descripción Subserie Documental', visible: true },
  { name: 'origen', label: 'Origen', visible: true },
  { name: 'condiciones', label: 'Condiciones de Acceso', visible: true }
];

// Computación de datos filtrados según el periodo seleccionado
const filteredData = computed(() => {
  return data.value.filter(item => item.period === selectedPeriod.value);
});

// Paginación
const currentPage = ref(1);
const rowsPerPage = ref(10);
const { paginatedItems, nextPage, previousPage, totalPages } = usePagination(filteredData, currentPage, rowsPerPage);

// Función para actualizar el periodo seleccionado
const updatePeriod = (period: string) => {
  selectedPeriod.value = period;
};

// Función para manejar la edición de elementos
const editItem = (id: any) => {
  console.log('Edit item with ID:', id);
  // Aquí puedes implementar la lógica para editar el ítem
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
