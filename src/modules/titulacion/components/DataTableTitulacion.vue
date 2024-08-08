<!-- <template>

   Input de búsqueda -->
  <div class="py-2 px-2">
    <form>
      <h5>Titulación</h5>
      <label class="sr-only">Búsqueda</label>
      <div class="relative w-full">
        <input type="text" v-model="searchFilter" placeholder="Buscar . . ."
          class="block pt-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </form>
  </div>
  <!-- Dropdown button # Filas -->
  <div class="relative inline-block text-left">
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown-2"
      class="bg-white-700 shadow-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm mx-4 my-2 px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800 "
      type="button"># Filas <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdown-2" class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="(item, index) in optionsRowsPerPage" :key="index">
          <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="onChangeRowsPerPage(item)">{{ item
            }}</span>
        </li>

      </ul>
    </div>
  </div>



  <!-- Tabla de datos -->
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">NUMERO</th>
          <th class="px-6 py-3">PRUEBA</th>
          <th class="px-6 py-3">CEDULA</th>
          <th class="px-6 py-3">MODALIDAD</th>
          <th class="px-6 py-3">TITULO</th>
          <th class="px-6 py-3">MALLA</th>
          <th class="px-6 py-3">DEFENSA</th>
          <th class="px-6 py-3">INFORME TURNITIN</th>
          <th class="px-6 py-3">RESPALDO</th>
          <th class="px-6 py-3">EXISTENCIA</th>
          <th class="px-6 py-3">ACCIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data">
          <td class="px-6 py-4">{{ data.numero }}</td>
          <td class="px-6 py-4">{{ data.cedula }}</td>
          <td class="px-6 py-4">{{ data.nombre }}</td>
          <td class="px-6 py-4">{{ data.modalidad }}</td>
          <td class="px-6 py-4">{{ data.titulo }}</td>
          <td class="px-6 py-4">{{ data.malla }}</td>
          <td class="px-6 py-4">{{ data.defensa }}</td>
          <td class="px-6 py-4">{{ data.informe }}</td>
          <td class="px-6 py-4">{{ data.respaldo }}</td>
          <td class="px-6 py-4">{{ data.existencia }}</td>
          <td class="px-6 py-4">
            <!-- <button @click="handleView(data)"
              class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Ver
            </button> -->
          </td>
        </tr>
    
      </tbody>
    </table>
  </div>

</template> -->

<!-- <script setup lang="ts">

import { ref, defineProps } from 'vue';

const searchFilter = ref<string>('');
const optionsRowsPerPage = [5, 10, 15, 20, 25, 30, 50];
const rowsPerPage = ref<number>(optionsRowsPerPage[0]);

const onChangeRowsPerPage = (rows: number) => {
  rowsPerPage.value = rows;
};

const props = defineProps<{
  data: any;
}>();
</script>

<style scoped>
/* Agrega estilos si es necesario */
</style> -->