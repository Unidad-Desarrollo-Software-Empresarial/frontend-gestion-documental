<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">Agregar Defensa</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700">Estudiante:</label>
          <input type="text" v-model="formData.nombre" class="w-full p-2 border rounded" readonly />
        </div>
        <div class="mb-4 flex items-center">
          <label class="block text-gray-700 mr-16 font-semibold">Fecha Defensa:</label>
          <input type="date" class="w-full p border rounded" />
        </div>
        <div class="mb-4 flex items-center">
          <label class="block text-gray-600 mr-4 font-semibold">IBARRA ESTEVEZ JOSE LUIS:</label>
          <input type="file" @change="handleFileUpload"
            class=" border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4 flex items-center">
          <label class="block text-gray-600 mr-4 font-semibold">IBARRA ESTEVEZ JOSE LUIS:</label>
          <input type="file" @change="handleFileUpload"
            class=" border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4 flex items-center">
          <label class="block text-gray-600 mr-4 font-semibold">IBARRA ESTEVEZ JOSE LUIS:</label>
          <input type="file" @change="handleFileUpload"
            class=" border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

interface FormData {
  cedula: string;
  nombre: string;
  defensa:string;
  pdfFile: File | null;
}

const props = defineProps({
  show: Boolean,
  data: Object,
});

const emit = defineEmits(['close', 'save']);

const formData: FormData = reactive({
  cedula: '',
  nombre: '',
  defensa:'',
  pdfFile: null,
});

// const isSaved = ref(false);

watch(() => props.data, (newVal) => {
  if (newVal) {
    formData.cedula = newVal.cedula || '';
    formData.nombre = newVal.nombre || '';
    formData.defensa = newVal.defensa || '';
    // isSaved.value = false; // Reset saved state when data changes
  }
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData.pdfFile = target.files[0];
  }
};

const submitForm = () => {
    emit('save', formData);
};

</script>
