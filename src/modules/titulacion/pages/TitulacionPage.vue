<template>
  <DashboardLayout>
    <div>
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Titulación Carreras</h3>
      <DataDemo :data="myData" @updateRow="handleView" />
    </div>

    <h3 class="text-2xl font-bold text-gray-800 mb-4">Titulación:</h3>
    
    <div v-if="showDataDemo">
      <button
        @click="openModal"
        class="px-3 py-0 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
        Agregar
      </button>
      <DataDemo :data="dataTitulo" />
    </div>
    <CreateTitulacionModal :show="showModal"  @close="closeModal" @save="saveStudent" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import DataDemo from '../components/DataDemo.vue';
import CreateTitulacionModal from '../components/CreateTitulacionModal.vue'; 
import { myData, dataTitulo } from '../dto/myData';

const showDataDemo = ref(false);
const showModal = ref(false);


const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveStudent = (newStudent: any) => {
  console.log('Estudiante guardado:', newStudent);
  // Aquí puedes agregar la lógica para guardar el estudiante
};

const handleView = (emitId: number) => {
  console.log('ID recibido:', emitId);
  const row = dataTitulo.find(item => item.numero === emitId);

  if (row) {
    console.log('Datos recibidos:', row);
    showDataDemo.value = true;
  } else {
    showDataDemo.value = false;
  }
};
</script>
