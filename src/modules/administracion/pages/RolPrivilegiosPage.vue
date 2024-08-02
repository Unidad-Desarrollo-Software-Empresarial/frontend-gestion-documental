<template>
    <DashboardLayout>
        <div class="flex justify-between">
            <div>
                <h2 class="text-2xl font-bold">ROL-PRIVILEGIO</h2>
            </div>
            <div>
                <button @click="openModalToCreate"
                    class="px-4 py-2 text-white bg-blue-500 rounded-lg h-10 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 focus:outline-none">
                    Crear ROL-PRIVILEGIO
                </button>
            </div>
        </div>

        <div>
            <CustomDataTable :data="dataTipoPractica" />
        </div>
        <!-- Agregar modal -->
        <CreateUpdateRolPrivilegioModal :open="isModalOpen" @close="closeModal" />
    </DashboardLayout>
</template>

<script setup lang="ts">
import CustomDataTable from '@/components/CustomDataTable.vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { ref } from 'vue';
import CreateUpdateRolPrivilegioModal from '@/modules/administracion/components/CreateUpdateRolPrivilegioModal.vue';

const dataTipoPractica = ref([
    { id: 1, role: 'Admin', carrera: 'Ingeniería', privilegio: 'TODOS LOS PRIVILEGIOS' },
    { id: 2, role: 'User', carrera: 'Medicina', privilegio: 'SOLO LECTURA' },
    { id: 3, role: 'Guest', carrera: 'Derecho', privilegio: 'SOLO ESCRITURA' }
]);

const isModalOpen = ref(false);

const openModalToCreate = () => {
    console.log('Crear ROL-PRIVILEGIO');
    isModalOpen.value = true;
};

const closeModal = () => {
    console.log('Cerrar modal');
    isModalOpen.value = false;
};
</script>

<style scoped></style>
