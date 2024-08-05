<template>
  <div>
    <label for="period-selector">Seleccionar Período:</label>
    <select id="period-selector" v-model="selectedPeriod" @change="emitUpdate">
      <option v-for="period in periods" :key="period" :value="period">
        {{ period }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  periods: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', period: string): void;
}>();

const selectedPeriod = ref(props.modelValue);

const emitUpdate = () => {
  emit('update:modelValue', selectedPeriod.value);
};
</script>

<style scoped>
/* Añade estilos si es necesario */
</style>
