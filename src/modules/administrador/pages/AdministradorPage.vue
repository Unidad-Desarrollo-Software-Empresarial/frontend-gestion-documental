<template>
    <DashboardLayout>
        <div class="flex justify-between mb-4">
            <div>
                <h2 class="text-2xl font-bold">ADMINISTRACION</h2>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-lg font-bold mb-4">Asignar ROL-PRIVILEGIO</h3>
            <form @submit.prevent="submitForm" class="grid grid-cols-4 gap-8">
                <!-- Usuarios -->
                <div class="flex flex-col gap-4 col-span-4">
                    <label class="block text-gray-700 font-bold mb-2">Usuarios</label>
                    <select v-model="selectedUsuario" @change="handleUsuarioChange" class="p-2 border border-gray-300 rounded">
                        <option value="" disabled>Seleccione un usuario</option>
                        <option v-for="usuario in usuarios" :key="usuario" :value="usuario">
                            {{ usuario }}
                        </option>
                    </select>
                </div>

                <!-- Mostrar roles solo si se selecciona un usuario -->
                <template v-if="selectedUsuario">
                    <!-- Roles -->
                    <div class="flex flex-col gap-4 col-span-4">
                        <label class="block text-gray-700 font-bold mb-2">Roles</label>
                        <div class="flex flex-col gap-2">
                            <div v-for="role in roles" :key="role" class="flex items-center">
                                <input type="checkbox" :id="role" :value="role" v-model="selectedRoles" class="mr-2">
                                <label :for="role">{{ role }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Rol Menú -->
                    <div class="flex flex-col gap-4 col-span-4" v-if="selectedRoles.length > 0">
                        <label class="block text-gray-700 font-bold mb-2">Rol Menú</label>
                        <div class="flex flex-col gap-2">
                            <div v-for="rolMenu in rolesMenu" :key="rolMenu.rol" class="flex items-center">
                                <input type="radio" :id="rolMenu.rol" :value="rolMenu.rol" v-model="selectedRolMenu" class="mr-2">
                                <label :for="rolMenu.rol">{{ rolMenu.rol }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Menú -->
                    <div class="flex flex-col gap-4 col-span-4" v-if="selectedRolMenu">
                        <label class="block text-gray-700 font-bold mb-2">Menú</label>
                        <div class="flex flex-col gap-2">
                            <div v-for="menu in menus" :key="menu" class="flex items-center">
                                <input type="checkbox" :id="menu" :value="menu" v-model="selectedMenus" class="mr-2">
                                <label :for="menu">{{ menu }}</label>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Botón de actualizar -->
                <div class="col-span-4 flex justify-end mt-6">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded" :disabled="!selectedUsuario">
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { ref } from 'vue';
import { usuarios, roles, rolesMenu, menus, getUsuarioData, saveUsuarioData } from '@/modules/administrador/dto/myData'; // Ajustar la ruta

const usuarioData = ref(getUsuarioData());

const selectedUsuario = ref<string | null>(null);
const selectedRoles = ref<string[]>([]);
const selectedRolMenu = ref<string | null>(null);
const selectedMenus = ref<string[]>([]);

const handleUsuarioChange = () => {
    if (selectedUsuario.value) {
        const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolMenu: null, menus: [] };
        selectedRoles.value = userData.roles;
        selectedRolMenu.value = userData.rolMenu;
        selectedMenus.value = userData.menus;
    } else {
        selectedRoles.value = [];
        selectedRolMenu.value = null;
        selectedMenus.value = [];
    }
};

const submitForm = () => {
    if (selectedUsuario.value && selectedRolMenu.value) {
        // Actualiza el rolMenu correspondiente con los módulos seleccionados
        const updatedRolesMenu = rolesMenu.map(roleMenu => {
            if (roleMenu.rol === selectedRolMenu.value) {
                return { ...roleMenu, modulos: selectedMenus.value };
            }
            return roleMenu;
        });

        // Guarda la actualización en el almacenamiento local
        saveUsuarioData({
            ...usuarioData.value,
            [selectedUsuario.value]: {
                roles: selectedRoles.value,
                rolMenu: selectedRolMenu.value,
                menus: selectedMenus.value
            }
        });

        // Actualiza rolesMenu en el localStorage
        localStorage.setItem('rolesMenu', JSON.stringify(updatedRolesMenu));

        // Alerta al usuario
        alert(`Datos de ${selectedUsuario.value} actualizados exitosamente.`);

        // Limpiar los campos después de actualizar
        handleUsuarioChange();
    }
};
</script>

<style scoped>
/* Ajustes para el diseño de cuadrícula */
.grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
}
</style>

