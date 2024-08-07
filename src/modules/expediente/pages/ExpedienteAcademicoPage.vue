<template>
  <DashboardLayout>
    <!-- Encabezado de la Página -->
    <header class="mb-6">
      <h1 class="text-xl md:text-2xl font-normal dark:text-white">
        Expediente
        <small class="ms-2 text-sm md:text-lg text-gray-400 dark:text-gray-300">- Edición</small>
      </h1>
    </header>

    <!-- Contenedor Principal -->
    <div class="border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 p-4 md:p-6 space-y-4 md:space-y-6">
      <!-- Selector de Período -->
      <CustomPeriodSelector 
        :periods="filteredPeriods" 
        :modelValue="selectedPeriod" 
        @update-modelValue="updatePeriod" 
      />
      <!-- Gestión de Columnas -->
      <ColumnVisibilityManager 
        :columns="columns" 
        @update-columns="updateColumnVisibility" 
        class="mb-4 md:mb-6" 
      />

      <!-- Acordeón que Contiene la Tabla de Datos -->
      <CustomAccordion title="Detalles del Expediente">
        <CustomDataTable 
          :data="paginatedItems" 
          :columns="columns" 
          :actionsVisible="true" 
          @edit-item="openEditModal" 
        />

        <!-- Paginación -->
        <div class="flex flex-wrap justify-center mt-4 md:mt-6">
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm">
            <li>
              <span
                @click="goToFirstPage"
                class="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Inicio
              </span>
            </li>
            <li>
              <span
                @click="previousPage"
                class="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Anterior
              </span>
            </li>
            <li v-for="page in totalPages" :key="page">
              <span
                @click="currentPage = page"
                :class="[
                  'flex items-center justify-center px-2 md:px-3 h-8 leading-tight border border-gray-300',
                  {
                    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage,
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                      page !== currentPage
                  }
                ]"
              >
                {{ page }}
              </span>
            </li>
            <li>
              <span
                @click="nextPage"
                class="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Siguiente
              </span>
            </li>
            <li>
              <span
                @click="goToLastPage"
                class="flex items-center justify-center px-2 md:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Fin
              </span>
            </li>
          </ul>
        </div>
      </CustomAccordion>

      <!-- Modal de Edición -->
      <EditModal 
        :isVisible="isModalVisible" 
        :expediente="selectedExpediente" 
        @update:expediente="updateExpediente" 
        @close="closeModal" 
      />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import CustomAccordion from '../components/CustomAccordion.vue'
import CustomDataTable from '../components/CustomDataTable.vue'
import CustomPeriodSelector from '../components/CustomPeriodSelector.vue'
import EditModal from '../components/EditModal.vue'
import ColumnVisibilityManager from '../components/ColumnVisibilityManager.vue'
import { mockData } from '../utils/mockData'
import type { Expediente } from '../types/expediente'
import usePagination from '../composables/usePagination'

// Datos y estado
const selectedPeriod = ref<string>('')
const data = ref<Expediente[]>(mockData)

// Definición de columnas de la tabla
const columns = ref([
  { name: 'numeracion', label: 'Numeración', visible: true },
  { name: 'serie', label: 'Serie Documental', visible: true },
  { name: 'subserie', label: 'Subserie Documental', visible: true },
  { name: 'descripcion', label: 'Descripción Subserie Documental', visible: true },
  { name: 'origen', label: 'Origen', visible: true },
  { name: 'condiciones', label: 'Condiciones de Acceso', visible: true }
])

// Computación de datos filtrados según el período seleccionado
const filteredData = computed(() => {
  return data.value.filter((item) => item.period === selectedPeriod.value)
})

// Computación de periodos únicos
const filteredPeriods = computed(() => {
  return Array.from(new Set(data.value.map((item) => item.period))).sort().reverse()
})

// Paginación
const currentPage = ref(1)
const rowsPerPage = ref(2)
const { paginatedItems, nextPage, previousPage, totalPages } = usePagination(filteredData, currentPage, rowsPerPage)

// Modal de edición
const isModalVisible = ref(false)
const selectedExpediente = ref<Expediente | null>(null)

// Función para manejar la edición de elementos
const openEditModal = (id: string) => {
  selectedExpediente.value = data.value.find((exp) => exp.numeracion === id) || null
  isModalVisible.value = true
}

// Función para actualizar un expediente
const updateExpediente = (expediente: Expediente) => {
  const index = data.value.findIndex((item) => item.numeracion === expediente.numeracion)
  if (index !== -1) {
    data.value[index] = expediente
  }
}

// Función para cerrar el modal
const closeModal = () => {
  isModalVisible.value = false
}

// Función para actualizar el período seleccionado
const updatePeriod = (period: string) => {
  selectedPeriod.value = period
  currentPage.value = 1 // Restablece la página actual a 1 al cambiar el período
}

// Función para actualizar la visibilidad de las columnas
const updateColumnVisibility = (updatedColumns: Array<{ name: string; label: string; visible: boolean }>) => {
  columns.value = updatedColumns
}

// Función para ir a la primera página
const goToFirstPage = () => {
  currentPage.value = 1
}

// Función para ir a la última página
const goToLastPage = () => {
  currentPage.value = totalPages.value
}

// Observa cambios en los datos filtrados para manejar el caso de datos vacíos
watch(filteredData, (newData) => {
  if (newData.length === 0) {
    currentPage.value = 1
  }
})

// Configura el período seleccionado por defecto al período más reciente cuando el componente se monta
onMounted(() => {
  if (filteredPeriods.value.length > 0) {
    selectedPeriod.value = filteredPeriods.value[0] // Establece el período más reciente
  }
})
</script>

<style scoped>
/* Añade estilos si es necesario */
</style>
