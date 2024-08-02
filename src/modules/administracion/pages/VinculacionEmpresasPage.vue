<template>
    <DashboardLayout>
        <div class="flex justify-between">
            <div>
                <h2 class="text-2xl font-bold">Empresas</h2>
            </div>
            <div>
                <button
                    class="px-4 py-2 text-white bg-blue-500 rounded-lg h-10 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    @click="openModalToCreate">Crear empresa</button>
            </div>
        </div>
        <div>
            <CustomDataTable :data="query.data.value" @update-row="openModalToUpdate" />
        </div>
        <CreateUpdateEmpresaModal :open="openCreateUpdateModal" @close="closeModal" :item-update="itemUpdate" />
    </DashboardLayout>
</template>

<script setup lang="ts">
import CustomDataTable from '@/components/CustomDataTable.vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import CreateUpdateEmpresaModal from '../components/CreateUpdateEmpresaModal.vue';

import { useGetEmpresas } from '../composables/use-empresas';
import { onMounted, ref, watch, watchEffect } from 'vue';
import type { EmpresaDto } from '../dto/empresa.dto';

const query = useGetEmpresas()

const dataEmpresas = ref<EmpresaDto[]>()

const openCreateUpdateModal = ref(false)

const itemUpdate = ref()

onMounted(() => {
    dataEmpresas.value = query.data.value
})

watchEffect(() => {
    dataEmpresas.value = query.data.value
})

const openModalToCreate = () => {
    openCreateUpdateModal.value = true
    itemUpdate.value = null
}

const openModalToUpdate = (id: number) => {
    // const { data: dataToUpdate } = useGetEmpresaById(itemUpdate.value)
    itemUpdate.value = id
    // dataPreload.value = dataToUpdate

    // Petición 
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