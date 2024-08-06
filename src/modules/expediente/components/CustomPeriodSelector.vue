<template>
  <div class="flex items-center space-x-2">
    <label for="period-selector" class="text-gray-700 font-medium">Seleccionar Período:</label>
    <select 
      id="period-selector" 
      v-model="selectedPeriod" 
      @change="emitUpdate" 
      class="border border-gray-300 rounded-lg px-3 py-2"
    >
      <option v-for="period in periods" :key="period" :value="period" >
        {{ period }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  periods: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update-modelValue', period: string): void;
}>();

const selectedPeriod = ref(props.modelValue);

const emitUpdate = () => {
  emit('update-modelValue', selectedPeriod.value ?? '');
};

// Watch for changes in the props.modelValue to keep the selectedPeriod in sync
watch(() => props.modelValue, (newValue) => {
  selectedPeriod.value = newValue;
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
