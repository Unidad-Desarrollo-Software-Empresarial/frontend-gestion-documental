<template>
  <DashboardLayout>
    <div class="p-4">
      <!-- Selector de Período -->
      <div class="mb-4">
        <label for="period-select" class="block text-gray-700 dark:text-gray-300">Periodo Académico:</label>
        <select id="period-select" v-model="selectedPeriod" class="bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md p-2">
          <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
        </select>
      </div>

      <!-- Acordeón: Periodo Académico -->
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            @click="toggleAccordion('accordion-collapse-body-1')"
            :aria-expanded="isExpanded['accordion-collapse-body-1']"
            aria-controls="accordion-collapse-body-1"
          >
            <span>Periodo Académico - {{ selectedPeriod }}</span>
            <svg
              class="w-3 h-3 transition-transform duration-200"
              :class="{ 'rotate-180': isExpanded['accordion-collapse-body-1'] }"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          :class="{ hidden: !isExpanded['accordion-collapse-body-1'] }"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <!-- Sub-Acordeones dentro de Periodo Académico -->
            <div v-for="(item, index) in academicPeriods" :key="index" class="mb-2">
              <h3 :id="'sub-accordion-heading-' + index">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  @click="toggleAccordion('sub-accordion-body-' + index)"
                  :aria-expanded="isExpanded['sub-accordion-body-' + index]"
                  :aria-controls="'sub-accordion-body-' + index"
                >
                  <span>{{ item.title }}</span>
                  <svg
                    class="w-3 h-3 transition-transform duration-200"
                    :class="{ 'rotate-180': isExpanded['sub-accordion-body-' + index] }"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h3>
              <div
                :id="'sub-accordion-body-' + index"
                :class="{ hidden: !isExpanded['sub-accordion-body-' + index] }"
                aria-labelledby="'sub-accordion-heading-' + index"
              >
                <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Acordeón: Cédula de Identidad -->
        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            @click="toggleAccordion('accordion-collapse-body-2')"
            :aria-expanded="isExpanded['accordion-collapse-body-2']"
            aria-controls="accordion-collapse-body-2"
          >
            <span>Cédula de Identidad</span>
            <svg
              class="w-3 h-3 transition-transform duration-200"
              :class="{ 'rotate-180': isExpanded['accordion-collapse-body-2'] }"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          :class="{ hidden: !isExpanded['accordion-collapse-body-2'] }"
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
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
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import { ref } from 'vue'

// Datos para el selector de períodos
const periods = ref(['2023-2024', '2022-2023', '2021-2022'])
const selectedPeriod = ref(periods.value[0])

// Datos para los subacordeones
const academicPeriods = ref([
  { title: 'Primer Semestre', content: 'Contenido del primer semestre.' },
  { title: 'Segundo Semestre', content: 'Contenido del segundo semestre.' }
])

const identityNumber = ref('')
const isExpanded = ref({
  'accordion-collapse-body-1': false,
  'accordion-collapse-body-2': false
})

function toggleAccordion(accordionId) {
  isExpanded.value[accordionId] = !isExpanded.value[accordionId]
}
</script>

<style scoped>

</style>
