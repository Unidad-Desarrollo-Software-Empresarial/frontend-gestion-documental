<template>
  <table class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
    <thead class="bg-gray-50">
      <tr>
        <th v-for="column in columns" :key="column.name" v-show="column.visible" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {{ column.label }}
        </th>
        <th v-if="actionsVisible" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr v-for="item in data" :key="item.id" class="hover:bg-gray-50">
        <td v-for="column in columns" :key="column.name" v-show="column.visible" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ item[column.name] }}
        </td>
        <td v-if="actionsVisible" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
          <button @click="onEditItem(item.id)" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
            Editar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: { [key: string]: any }[];
  columns: { name: string; label: string; visible: boolean }[];
  actionsVisible: boolean;
  onEditItem: (id: any) => void;
}>();

const { data, columns, actionsVisible, onEditItem } = props;
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
