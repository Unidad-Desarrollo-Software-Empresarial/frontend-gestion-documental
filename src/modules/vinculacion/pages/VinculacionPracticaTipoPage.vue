<template>
    <DashboardLayout>
        <div class="flex justify-between">
            <div>
                <h2 class="text-2xl font-bold">Tipos de Practicas/Vinculaciones</h2>
            </div>
            <div>
                <button @click="openModalToCreate"
                    class="px-4 py-2 text-white bg-blue-500 rounded-lg h-10 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 focus:outline-none">Crear
                    Tipo de Practica</button>
            </div>
        </div>

        <div>
            <CustomDataTable :data="query.data.value" @update-row="openModalToUpdate" />
        </div>
        <!-- Agregar modal -->
        <CreateUpdateTipoPracticaModal :open="isOpenModal" :itemUpdate="itemUpdate" @close="closeModal" />
    </DashboardLayout>
</template>

<script setup lang="ts">
import CustomDataTable from '@/components/CustomDataTable.vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import CreateUpdateTipoPracticaModal from '../components/CreateUpdateTipoPracticaModal.vue';
import { useGetTipoPracticasVinculaciones } from '../composables/use-tipo-vinculaciones';
import { onMounted, ref, watch, watchEffect } from 'vue';

const query = useGetTipoPracticasVinculaciones()

const dataTipoPractica = ref([])

const itemUpdate = ref()

const isOpenModal = ref(false)

// onMounted(() => {
//     dataTipoPractica.value = query.data.value
// })

// watchEffect(() => {
//     dataTipoPractica.value = query.data.value
// })

watch(itemUpdate, (newValue) => {
    console.log('itemUpdate', newValue)
})

const openModalToCreate = () => {
    console.log('Crear tipo de practica')
    itemUpdate.value = null
    isOpenModal.value = true
}

const openModalToUpdate = (id: number) => {
    console.log('Actualizar tipo de practica', id)
    itemUpdate.value = id
    isOpenModal.value = true
}

const closeModal = () => {
    console.log('Cerrar modal')
    isOpenModal.value = false
}

</script>

<style scoped></style>