import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
<template>
    <DashboardLayout>
        <div class="flex justify-between">
            <div>
                <h2 class="text-2xl font-bold">Titulación de Carreras</h2>
            </div>
         
        </div>
        <div>
            <CustomDataTable :data="query.data.value" @update-row="openModalToUpdate" />
        </div>
        <CreateUpdateEspecificacionModal :open="openCreateUpdateModal" :item-update="itemUpdate" @close="closeModal" />
        
        <div v-if="showSecondTable">
            <div class="flex justify-between mt-4">
                <div>
                    <h2 class="text-2xl font-bold">Titulación:</h2>
                </div>
            </div>
            <div>
                <CustomDataTable :data="query.data.value" @update-row="openModalToUpdate" />
            </div>
            <CreateUpdateEspecificacionModal :open="openCreateUpdateModal" :item-update="itemUpdate" @close="closeModal" />
        </div>
    </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import CustomDataTable from '@/modules/titulacion/components/DataTableTitulacion.vue'
import CreateUpdateEspecificacionModal from '../components/CreateUpdateEspecificacionModal.vue'

import { ref, watch } from 'vue';
import { useGetVinculacionEspecificaciones } from '../composables/use-especificaciones';


const openCreateUpdateModal = ref(false)
const query = useGetVinculacionEspecificaciones()
const itemUpdate = ref()

const openModalToUpdate = (id: number) => {
    itemUpdate.value = id
}
const closeModal = () => {
    openCreateUpdateModal.value = false
}

const openModalToCreate = () => {
    openCreateUpdateModal.value = true
    itemUpdate.value = null
}
watch(itemUpdate, (newValue) => {
    itemUpdate.value = newValue
    openCreateUpdateModal.value = true
})
const openTable = () => {
    openCreateUpdateModal.value = true
    itemUpdate.value = null
}
const showSecondTable = ref(false);

const toggleTable = () => {
    showSecondTable.value = !showSecondTable.value;
};
</script>

<style scoped></style>