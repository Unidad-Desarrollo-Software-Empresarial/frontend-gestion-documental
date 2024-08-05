<template>
  <div class="accordion">
    <button @click="toggle" class="accordion-header">
      {{ title }}
    </button>
    <div v-show="isOpen" class="accordion-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  title: string;
}>();

const title = props.title; // Usar `title` en el template

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.accordion {
  border: 1px solid #ddd;
  border-radius: 5px;
}
.accordion-header {
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.accordion-body {
  padding: 10px;
}
</style>
