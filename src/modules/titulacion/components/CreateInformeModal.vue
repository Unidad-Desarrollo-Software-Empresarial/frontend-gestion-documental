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
import { reactive, ref, watch } from 'vue';

interface FormData {
    cedula: string;
    nombre: string;
    titulo: string;
    pdfFile: File | null;
}

const props = defineProps({
    show: Boolean,
    data: Object,
});

const emit = defineEmits(['close', 'save']);

const formData: FormData = reactive({
    cedula: '',
    nombre: '',
    titulo: '',
    pdfFile: null,
});

const isSaved = ref(false);

watch(() => props.data, (newVal) => {
    if (newVal) {
        formData.cedula = newVal.cedula || '';
        formData.nombre = newVal.nombre || '';
        formData.titulo = newVal.titulo || '';
        isSaved.value = false; // Reset saved state when data changes
    }
});

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        formData.pdfFile = target.files[0];
    }
};

const submitForm = () => {
    if (formData.pdfFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const pdfContent = e.target?.result as string;
            emit('save', { ...formData, pdfContent, cedula: formData.cedula });
            isSaved.value = true;
        };
        reader.readAsDataURL(formData.pdfFile);
    } else {
        emit('save', { ...formData, cedula: formData.cedula });
        isSaved.value = true;
    }
};

</script>
