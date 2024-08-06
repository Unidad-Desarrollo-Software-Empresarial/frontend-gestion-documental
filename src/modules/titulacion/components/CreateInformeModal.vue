<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">Agregar Informe</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-gray-700">Cédula:</label>
                    <input type="text" v-model="formData.cedula" class="w-full p-2 border rounded" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Nombre:</label>
                    <input type="text" v-model="formData.nombre" class="w-full p-2 border rounded" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Título:</label>
                    <input type="text" v-model="formData.titulo" class="w-full p-2 border rounded" readonly />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Subir PDF:</label>
                    <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded" />
                </div>
                <div class="flex justify-end">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue';

const props = defineProps({
    show: Boolean,
    data: Object,
});

const emit = defineEmits(['close', 'save']);

const formData = reactive({ ...props.data, pdfFile: null });

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        formData.pdfFile = target.files[0];
    }
};

const submitForm = () => {
    emit('save', formData);
};

watch(() => props.data, (newVal) => {
    if (newVal) {
        Object.assign(formData, newVal);
    }
});
</script>