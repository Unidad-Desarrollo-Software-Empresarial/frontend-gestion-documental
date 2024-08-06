<template>
  <div class="border border-gray-300 rounded-lg">
    <button 
      @click="toggle" 
      class="w-full px-4 py-2 text-left bg-gray-100 border-b border-gray-300 text-gray-900 font-medium"
    >
      {{ props.title }}
    </button>
    <div v-show="isOpen" class="p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
