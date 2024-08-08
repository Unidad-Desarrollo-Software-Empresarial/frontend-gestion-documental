<template>
  <DashboardLayout>
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-bold">Matriz de Graduados</h2>
      </div>
    </div>
    <div>
      <CustomTable 
        :data="myData" 
        @action="handleTableAction" 
        :selected-row="selectedRow"
        :show-actions="showActions"
      />
    </div>
    <!-- Botones de acción en la parte inferior
    <div v-if="showActions" class="flex justify-end gap-4 mt-4">
      <button @click="handleViewAction" type="button" class="btn-view">Ver</button>
      <button @click="handleEditAction" type="button" class="btn-edit">Editar</button>
    </div> -->
    <!-- Segunda tabla -->
    <div v-if="showSecondTable" class="mt-4">
      <h2 class="text-xl font-bold">Detalles del Graduado</h2>
      <CustomTable2 :data="detailedData" />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import CustomTable from '@/modules/alumni/components/CustomTable.vue';
import CustomTable2 from '../components/CustomTable2.vue';

// Datos de ejemplo
const myData = [
  { no: 1, Escuela: 'Escuela de Ciencias', Carrera: 'CS101', Activa: true, respaldos: 'Respaldo_001.pdf' },
  { no: 2, Escuela: 'Escuela de Ingenierías', Carrera: 'CS102', Activa: false, respaldos: 'Respaldo_002.pdf' },
  { no: 3, Escuela: 'Escuela de Humanidades', Carrera: 'CS103', Activa: true, respaldos: 'Respaldo_003.pdf' }
];

const detailedData = [
  { no: 1, codigoCarrera: 'CS101', nombres: 'Juan Pérez', fechaActa: '2021-06-01', promedio: 8.5, titulacion: 9.0, notaFinal: 8.75, respaldos: 'Respaldo_001.pdf', resumen: 'Resumen_001.pdf', expediente: 'Expediente_001.pdf', cambiar: true, eliminar: false },
  // Otros datos de ejemplo...
];

const selectedRow = ref<number | null>(null);
const showActions = ref(false);
const showSecondTable = ref(false);

// Manejo de acción de la tabla
const handleTableAction = ({ id, action }: { id: number, action: string }) => {
  selectedRow.value = id;
  showActions.value = true;
  showSecondTable.value = false; // Ocultar la segunda tabla cuando se seleccione una nueva fila
}

// Función para manejar la acción del botón Ver
const handleViewAction = () => {
  if (selectedRow.value !== null) {
    console.log('Ver detalles para el ID:', selectedRow.value);
    showSecondTable.value = true; // Mostrar la segunda tabla
  }
}

// Función para manejar la acción del botón Editar
const handleEditAction = () => {
  if (selectedRow.value !== null) {
    console.log('Editar el registro con ID:', selectedRow.value);
  }
}
</script>
