<template>
  <div class="border rounded-md overflow-hidden shadow-md">
    <button @click="toggle" class="w-full bg-gray-200 text-left px-4 py-2 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
      {{ title }}
    </button>
    <div v-show="isOpen" class="p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  title: string;
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
