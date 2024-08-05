<template>
  <DashboardLayout>
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-bold">Especificaciones</h2>
      </div>
      <div>
        <button
          class="px-4 py-2 text-white bg-blue-500 rounded-lg h-10 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 focus:outline-none"
          @click="openModalToCreate"
        >
          Crear Especificación
        </button>
      </div>
    </div>
    <div>
      <CustomDataTable :data="query.data.value" @update-row="openModalToUpdate" />
    </div>
    <CreateUpdateEspecificacionModal :open="openCreateUpdateModal" :item-update="itemUpdate" @close="closeModal" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import CustomDataTable from '@/components/CustomDataTable.vue'

import { useGetVinculacionEspecificaciones } from '../composables/use-especificaciones'
import CreateUpdateEspecificacionModal from '../components/CreateUpdateEspecificacionModal.vue'
import type { VinculacionesEspecificacionesDto } from '../dto/especificaciones.dto'

const query = useGetVinculacionEspecificaciones()

const dataEspecificaciones = ref<VinculacionesEspecificacionesDto[]>()

const openCreateUpdateModal = ref(false)

const itemUpdate = ref()

onMounted(() => {
  // dataEspecificaciones.value = query.data.value
  dataEspecificaciones.value = query.data.value
})

const openModalToCreate = () => {
  openCreateUpdateModal.value = true
  itemUpdate.value = null
}

const openModalToUpdate = (id: number) => {
  itemUpdate.value = id
}

const closeModal = () => {
  openCreateUpdateModal.value = false
}

watch(itemUpdate, (newValue) => {
  itemUpdate.value = newValue
  openCreateUpdateModal.value = true
})
</script>

<style scoped></style>
