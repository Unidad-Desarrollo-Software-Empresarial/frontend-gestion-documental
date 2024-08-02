<template>
    <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 class="text-lg font-bold mb-4">ROL-PRIVILEGIO</h3>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Roles</label>
                    <div v-for="role in roles" :key="role" class="mb-2 flex items-center">
                        <input type="checkbox" :id="role" :value="role" v-model="selectedRoles" class="mr-2">
                        <label :for="role">{{ role }}</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Carreras</label>
                    <div v-for="carrera in carreras" :key="carrera" class="mb-2 flex items-center">
                        <input type="checkbox" :id="carrera" :value="carrera" v-model="selectedCarreras" class="mr-2">
                        <label :for="carrera">{{ carrera }}</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Privilegios</label>
                    <select v-model="selectedPrivilegio" class="w-full p-2 border border-gray-300 rounded">
                        <option v-for="privilegio in privilegios" :key="privilegio" :value="privilegio">
                            {{ privilegio }}
                        </option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                        Cancelar
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    open: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const roles = ref(['Admin', 'User', 'Guest']);
const carreras = ref(['Ingeniería', 'Medicina', 'Derecho']);
const privilegios = ref(['SOLO LECTURA', 'SOLO ESCRITURA', 'TODOS LOS PRIVILEGIOS']);

const selectedRoles = ref<string[]>([]);
const selectedCarreras = ref<string[]>([]);
const selectedPrivilegio = ref<string | null>(null);

const submitForm = () => {
    console.log('Roles seleccionados:', selectedRoles.value);
    console.log('Carreras seleccionadas:', selectedCarreras.value);
    console.log('Privilegio seleccionado:', selectedPrivilegio.value);
    emit('close');
};

const close = () => {
    emit('close');
};
</script>

<style scoped>
</style>
