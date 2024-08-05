<template>
  <DashboardLayout>
    <div>
      <DataDemo :data="myData" @updateRow="handleView" />
    </div>

    <!-- DataTableTitulacion -->
    <div>
      <DataDemo v-if="showDataDemo" :data="dataTitulo" />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import DataDemo from '../components/DataDemo.vue';
import { myData, dataTitulo } from '../dto/myData';

// Definir propiedades reactivas
const showDataDemo = ref(false);

// Manejar el evento 'updateRow'
const handleView = (emitId: number) => {
  console.log('ID recibido:', emitId);

  // Aquí debes determinar cómo obtener la fila correspondiente con base en emitId
  const row = dataTitulo.find(item => item.numero === emitId);

  if (row) {
    console.log('Datos recibidos:', row);
    //selectedRow.value = row;
    showDataDemo.value = true;
  } else {
    showDataDemo.value = false;
  }
};
</script>
<style></style>