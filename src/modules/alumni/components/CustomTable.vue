<template>
  <div>
    <div class="flex">
      <!-- Dropdown button Columnas -->
      <div class="relative inline-block text-left">
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" data-dropdown-delay="200"
          class="bg-white-700 shadow-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm mx-4 my-2 px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
          type="button">
          Columnas
          <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdown"
          class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-h-[400px] min-w-[400px] overflow-auto">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li v-for="(column, index) in columns" :key="index"
              class="flex justify-between hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
              @click="toggleColumnVisibility(index)">
              <span class="block px-4 py-2">{{ column.head }}</span>
              <span :class="[
                `${column.isShowing ? 'text-green-500' : 'text-red-500'}`,
                'block px-4 py-2'
              ]">{{ column.isShowing ? 'Visible' : 'Oculto' }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Input de búsqueda -->
      <div class="">
        <form class="py-2 px-2">
          <label class="sr-only">Búsqueda</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" v-model="searchQuery" placeholder="Buscar . . ."
              class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
        </form>
      </div>
    </div>

    <!-- Tabla -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th v-if="columns[0].isShowing" class="px-6 py-3">#</th>
            <th v-if="columns[1].isShowing" class="px-6 py-3">Escuela</th>
            <th v-if="columns[2].isShowing" class="px-6 py-3">Carrera</th>
            <th v-if="columns[3].isShowing" class="px-6 py-3">Activa</th>
            <th v-if="columns[4].isShowing" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td v-if="columns[0].isShowing" class="px-6 py-4">{{ item.no }}</td>
            <td v-if="columns[1].isShowing" class="px-6 py-4">{{ item.Escuela }}</td>
            <td v-if="columns[2].isShowing" class="px-6 py-4">{{ item.Carrera }}</td>
            <td v-if="columns[3].isShowing" class="px-6 py-4">
              <span :class="item.Activa ? 'inline-block w-4 h-4 bg-green-500 rounded-full' : 'inline-block w-4 h-4 bg-gray-500 rounded-full'"></span>
            </td>
            <td v-if="columns[4].isShowing" class="px-6 py-4 text-center">
              <button
                @click="handleViewAction(item.no)"
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
              >
                Ver
              </button>
             
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botones de acción en la parte inferior -->
     <div v-if="showButtons" class="btn-view">
      <button
        @click="emitAction('view')"
        type="button"
        class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
      >
        Ver
      </button>
      <button
        @click="emitAction('edit')"
        type="button"
        class="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none dark:focus:ring-yellow-800"
      >
        Editar
      </button>
    </div>
  </div> 
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: Array<{
    no: number;
    Escuela: string;
    Carrera: string;
    Activa: boolean;
    respaldos: string;
  }>;
  selectedRow: number | null;
  showActions: boolean;
}>();

const emit = defineEmits<{
  (e: 'action', payload: { id: number, action: string }): void;
}>();

const searchQuery = ref('');
const selectedItem = ref<number | null>(null);
const showButtons = ref(false);

// Definir las columnas y su visibilidad
const columns = ref([
  { head: '#', isShowing: true },
  { head: 'Escuela', isShowing: true },
  { head: 'Carrera', isShowing: true },
  { head: 'Activa', isShowing: true },
  { head: 'Acciones', isShowing: true }
]);

// Computed property para datos filtrados
const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.data.filter(item =>
    item.no.toString().includes(query) ||
    item.Escuela.toLowerCase().includes(query) ||
    item.Carrera.toLowerCase().includes(query)
  );
});

const handleViewAction = (id: number) => {
  selectedItem.value = id;
  showButtons.value = true;
};

const handleEditAction = (id: number) => {
  emit('action', { id, action: 'edit' });
};

const toggleColumnVisibility = (index: number) => {
  columns.value[index].isShowing = !columns.value[index].isShowing;
};

const emitAction = (action: string) => {
  if (selectedItem.value !== null) {
    emit('action', { id: selectedItem.value, action });
  }
};
</script>
