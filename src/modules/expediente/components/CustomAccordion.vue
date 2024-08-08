<template>
  <div>
    <div class="border-b border-gray-200 dark:border-gray-700">
      <h2 :id="headingId">
        <button 
          type="button" 
          @click="toggle" 
          :aria-expanded="isOpen ? 'true' : 'false'"
          :aria-controls="bodyId"
          class="flex items-center justify-between w-full p-3 font-medium text-gray-500 border-b border-gray-200 rounded-t-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-2"
        >
          <span>{{ title }}</span>
          <svg 
            class="w-3 h-3 transition-transform duration-300" 
            :class="{'rotate-180': isOpen}" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 10 6"
          >
            <path 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div 
        :id="bodyId" 
        :aria-labelledby="headingId" 
        v-show="isOpen" 
        class="p-3 border border-b-0 border-gray-200 dark:border-gray-700"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  title?: string;
}>();

const title = props.title; // Usar props directamente

const isOpen = ref(false);
const headingId = 'accordion-heading-' + Math.random().toString(36).substr(2, 9);
const bodyId = 'accordion-body-' + Math.random().toString(36).substr(2, 9);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
