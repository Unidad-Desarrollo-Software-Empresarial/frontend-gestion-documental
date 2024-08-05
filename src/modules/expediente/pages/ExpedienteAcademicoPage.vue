<template>
  <DashboardLayout>
    <div class="p-4">
      <!-- Selector de periodo -->
      <CustomPeriodSelector :periods="periods" :modelValue="selectedPeriod" @update:modelValue="updatePeriod" />
      
      <!-- Acordeón que contiene la tabla de datos -->
      <CustomAccordion title="Detalles del Expediente">
        <CustomDataTable
          :data="filteredData"
          :columns="columns"
          :actionsVisible="true"
          @edit-item="editItem"
        />
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
  return data.value.filter(item => item.periodo === selectedPeriod.value);
});

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
/* Añade estilos si es necesario */
</style>
