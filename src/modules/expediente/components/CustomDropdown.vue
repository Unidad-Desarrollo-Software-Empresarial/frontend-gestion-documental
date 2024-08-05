<template>
  <div>
    <!-- Tu dropdown aquí -->
    <button @click="toggleColumnVisibility">
      Toggle Column
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Definir props y emits
const props = defineProps<{
  columns: { head: string; isShowing: boolean }[];
  options: string[];
}>();

const emit = defineEmits<{
  (event: 'update:columns', columns: { head: string; isShowing: boolean }[]): void;
}>();

// Función para cambiar la visibilidad de las columnas y emitir el cambio
const toggleColumnVisibility = () => {
  const updatedColumns = props.columns.map(col => ({
    ...col,
    isShowing: !col.isShowing
  }));
  
  emit('update:columns', updatedColumns);
};
</script>

<style scoped>
/* Añade estilos si es necesario */
</style>
