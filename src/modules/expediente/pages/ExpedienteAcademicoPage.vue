<template>
  <DashboardLayout>
    <div class="p-4">
      <!-- Selector de Período -->
      <div class="mb-4">
        <label for="period-select" class="block text-gray-700 dark:text-gray-300">Periodo Académico:</label>
        <select id="period-select" v-model="selectedPeriod" @change="fetchAcademicPeriods" class="bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md p-2">
          <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
        </select>
      </div>

      <!-- Acordeón: Periodo Académico -->
      <CustomAccordion
        title="`Periodo Académico - ${selectedPeriod}`"
        :isExpanded="isExpanded['accordion-collapse-body-1']"
        headingId="accordion-collapse-heading-1"
        bodyId="accordion-collapse-body-1"
        :toggleAccordion="toggleAccordion"
      >
        <!-- Sub-Acordeones dentro de Periodo Académico -->
        <div v-for="(item, index) in academicPeriods" :key="index" class="mb-2">
          <CustomAccordion
            :title="item.title"
            :isExpanded="isExpanded[`sub-accordion-body-${index}`]"
            :headingId="`sub-accordion-heading-${index}`"
            :bodyId="`sub-accordion-body-${index}`"
            :toggleAccordion="toggleAccordion"
          >
            <p>{{ item.content }}</p>
          </CustomAccordion>
        </div>
      </CustomAccordion>

      <!-- Acordeón: Cédula de Identidad -->
      <CustomAccordion
        title="Cédula de Identidad"
        :isExpanded="isExpanded['accordion-collapse-body-2']"
        headingId="accordion-collapse-heading-2"
        bodyId="accordion-collapse-body-2"
        :toggleAccordion="toggleAccordion"
      >
        <input
          id="id-input"
          type="text"
          v-model="identityNumber"
          placeholder="Ingrese cédula de identidad"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
        <table
          v-if="identityNumber.length === 10"
          class="min-w-full mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Periodo</th>
              <th class="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Archivo</th>
              <th class="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">2023-2024</td>
              <td class="px-6 py-4 whitespace-nowrap">Archivo 1</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 block">Ver</button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">2022-2023</td>
              <td class="px-6 py-4 whitespace-nowrap">Archivo 2</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 block">Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </CustomAccordion>
    </div>
  </DashboardLayout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { useExpedienteAcademico } from '../composables/useExpedienteAcademico';
import CustomAccordion from '../components/CustomAccordion.vue';

const {
  periods,
  selectedPeriod,
  academicPeriods,
  identityNumber,
  isExpanded,
  toggleAccordion,
  fetchAcademicPeriods
} = useExpedienteAcademico();

watch(selectedPeriod, fetchAcademicPeriods);
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
