<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Agregar Estudiante</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700">Cédula</label>
          <input v-model="cedula" type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Estudiante</label>
          <input v-model="estudiante" type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Modalidad</label>
          <select v-model="modalidad" @change="handleModalidadChange"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50">
            <option value="">Seleccione una modalidad</option>
            <option value="Modalidad1">Trabajo de Titulación</option>
            <option value="Modalidad2">Examen Complexivo</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Título</label>
          <input v-model="titulo" type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50" required />
        </div>
        <div v-if="modalidad" class="mb-4">
          <label class="block text-gray-700">Malla</label>
          <div>
            <label v-for="year in years" :key="year" class="inline-flex items-center mr-4">
              <input type="radio" :value="year" v-model="malla" />
              <span class="ml-2">{{ year }}</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" @click="closeModal"
            class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['close', 'save'])
const props = defineProps({
  show: Boolean,
});

const cedula = ref('');
const estudiante = ref('');
const modalidad = ref('');
const malla = ref('');
const titulo = ref('');
const years = ref([]);

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  const newStudent = {
    cedula: cedula.value,
    estudiante: estudiante.value,
    modalidad: modalidad.value,
    malla: malla.value,
    titulo: titulo.value,
  };
  emit('save', newStudent);
  closeModal();
};

const handleModalidadChange = () => {
  if (modalidad.value) {
    years.value = ['2008', '2009', '2010','2011','2012','2013','2014']; // Puedes ajustar esto según tus necesidades
  } else {
    years.value = [];
  }
};

watch(() => props.show, (newVal) => {
  if (!newVal) {
    cedula.value = '';
    estudiante.value = '';
    modalidad.value = '';
    malla.value = '';
    titulo.value = '';
    years.value = [];
  }
});
</script>

<style scoped>
.fixed {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
