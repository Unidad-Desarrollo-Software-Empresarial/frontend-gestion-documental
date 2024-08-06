<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            v-show="column.visible"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
          <th v-if="actionsVisible" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in dataShow" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.name"
            v-show="column.visible"
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ item[column.name] }}
          </td>
          <td v-if="actionsVisible" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
            <button
              @click="onEditItem(item.id)"
              class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 block"
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

// Definición de props
const props = defineProps<{
  data: { [key: string]: any }[]
  columns: { name: string; label: string; visible: boolean }[]
  actionsVisible: boolean
  onEditItem: (id: any) => void
}>()

// Usa las propiedades en el template
const { columns, actionsVisible, onEditItem } = props

const dataShow = ref(props.data)
</script>

<style scoped>
/* Estilos para la tabla si es necesario */
</style>
