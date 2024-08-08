<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-3">No.</th>
          <th class="px-6 py-3">CÓDIGO CARRERA</th>
          <th class="px-6 py-3">NOMBRES</th>
          <th class="px-6 py-3">FECHA ACTA GRADO</th>
          <th class="px-6 py-3">NOTA PROMEDIO ACUMULADO</th>
          <th class="px-6 py-3">NOTA TRABAJO TITULACIÓN</th>
          <th class="px-6 py-3">NOTA FINAL</th>
          <th class="px-6 py-3">RESPALDOS</th>
          <th class="px-6 py-3">ARCHIVO RESUMEN</th>
          <th class="px-6 py-3">EXPEDIENTE COMPLETO</th>
          <th class="px-6 py-3">CAMBIAR INFORMACIÓN O ARCHIVO RESUMEN</th>
          <th class="px-6 py-3">ELIMINAR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">{{ item.no }}</td>
          <td class="px-6 py-4">{{ item.codigoCarrera }}</td>
          <td class="px-6 py-4">{{ item.nombres }}</td>
          <td class="px-6 py-4">{{ item.fechaActa }}</td>
          <td class="px-6 py-4">{{ item.promedio }}</td>
          <td class="px-6 py-4">{{ item.titulacion }}</td>
          <td class="px-6 py-4">{{ item.notaFinal }}</td>
          <td class="px-6 py-4">{{ item.respaldos }}</td>
          <td class="px-6 py-4">{{ item.resumen }}</td>
          <td class="px-6 py-4">{{ item.expediente }}</td>
          <td class="px-6 py-4">
            <button type="button" class="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none dark:focus:ring-yellow-800">Cambiar</button>
          </td>
          <td class="px-6 py-4">
            <button type="button" class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-500 focus:outline-none dark:focus:ring-red-800">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Array<{
    no: number;
    codigoCarrera: string;
    nombres: string;
    fechaActa: string;
    promedio: number;
    titulacion: number;
    notaFinal: number;
    respaldos: string;
    resumen: string;
    expediente: string;
    cambiar: boolean;
    eliminar: boolean;
  }>;
}>();
</script>
