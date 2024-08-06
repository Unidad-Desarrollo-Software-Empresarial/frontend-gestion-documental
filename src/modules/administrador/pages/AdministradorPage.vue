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
                <!-- Selección de usuarios y campo de búsqueda -->
                <div class="flex gap-8 col-span-4">
                    <!-- Usuarios -->
                    <div class="flex flex-col flex-1">
                        <label class="block text-gray-700 font-bold mb-2">Usuarios</label>
                        <select v-model="selectedUsuario" @change="handleUsuarioChange" class="p-2 border border-gray-300 rounded">
                            <option value="" disabled>Seleccione un usuario</option>
                            <option v-for="usuario in filteredUsuarios" :key="usuario" :value="usuario">
                                {{ usuario }}
                            </option>
                        </select>
                    </div>

                    <!-- Campo de búsqueda de usuarios -->
                    <div class="flex flex-col flex-1">
                        <label class="block text-gray-700 font-bold mb-2">Buscar Usuarios</label>
                        <input type="text" v-model="searchQuery" placeholder="Buscar usuario..." class="p-2 border border-gray-300 rounded">
                        <p v-if="searchQuery && filteredUsuarios.length === 0" class="text-red-500 mt-2">No hay coincidencias</p>
                        <p v-if="searchQuery && filteredUsuarios.length > 1" class="text-green-500 mt-2">Cantidad de coincidencias: {{ filteredUsuarios.length }}</p>
                    </div>
                </div>

                <!-- Mostrar roles solo si se selecciona un usuario -->
                <template v-if="selectedUsuario">
                    <!-- Cuadro con roles, rol-menu y menús habilitados -->
                    <div class="col-span-4 flex gap-8">
                        <!-- Contenedor principal de Roles, Rol-Menu y Menú -->
                        <div class="flex-1 flex flex-col gap-6">
                            <!-- Contenedor de Roles -->
                            <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg w-64 max-h-80 overflow-auto">
                                <h4 class="text-lg font-bold mb-2">Roles</h4>
                                <button type="button" @click="toggleRolesSelection" class="px-2 py-1 bg-blue-500 text-white rounded text-sm mb-2 w-full">
                                    {{ allRolesSelected ? 'Desmarcar Todos' : 'Marcar Todos' }}
                                </button>
                                <div class="flex flex-col gap-2">
                                    <div v-for="role in roles" :key="role" class="flex items-center">
                                        <input type="checkbox" :id="role" :value="role" v-model="selectedRoles" class="mr-2">
                                        <label :for="role">{{ role }}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Rol Menú -->
                            <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg w-64 max-h-80 overflow-auto" v-if="selectedRoles.length > 0">
                                <h4 class="text-lg font-bold mb-2">Rol Menú</h4>
                                <div class="flex flex-col gap-2">
                                    <div v-for="rolMenu in rolesMenu" :key="rolMenu.rol" class="flex items-center">
                                        <input type="radio" :id="rolMenu.rol" :value="rolMenu.rol" v-model="selectedRolMenu" @change="handleRolMenuChange" class="mr-2">
                                        <label :for="rolMenu.rol">{{ rolMenu.rol }}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Menú -->
                            <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg w-64 max-h-80 overflow-auto" v-if="selectedRolMenu">
                                <h4 class="text-lg font-bold mb-2">Menú</h4>
                                <button type="button" @click="toggleMenusSelection" class="px-2 py-1 bg-blue-500 text-white rounded text-sm mb-2 w-full">
                                    {{ allMenusSelected ? 'Desmarcar Todos' : 'Marcar Todos' }}
                                </button>
                                <div class="flex flex-col gap-2">
                                    <div v-for="menu in menus" :key="menu" class="flex items-center">
                                        <input type="checkbox" :id="menu" :value="menu" v-model="selectedMenus" class="mr-2">
                                        <label :for="menu">{{ menu }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recuadro con información de roles, rol-menu y menús habilitados -->
                        <div class="w-64 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-80 overflow-auto">
                            <h4 class="text-lg font-bold mb-2">Roles</h4>
                            <div v-if="selectedUsuarioData">
                                <ul class="list-disc pl-5">
                                    <li v-for="role in selectedUsuarioData.roles" :key="role">{{ role }}</li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Recuadro con Rol-Menu y Menús Habilitados -->
                        <div class="w-64 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-80 overflow-auto">
                            <h4 class="text-lg font-bold mb-2">Rol-Menu y Menús Habilitados</h4>
                            <div v-if="selectedUsuarioData">
                                <div v-for="(menus, rolMenu) in selectedUsuarioData.rolMenus" :key="rolMenu">
                                    <h5 class="font-bold mt-2">{{ rolMenu }} Menús:</h5>
                                    <ul class="list-disc pl-5">
                                        <li v-for="menu in menus.menus" :key="menu">{{ menu }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Botones de acción -->
                <div class="col-span-4 flex justify-end mt-6 gap-4 items-center">
                    <!-- Botón de actualizar -->
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded" :disabled="!selectedUsuario">
                        Actualizar
                    </button>
                    <!-- Botón de deshacer cambios -->
                    <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-500 text-white rounded">
                        Deshacer Cambios
                    </button>
                    <!-- Nota de deshacer cambios -->
                    <p class="text-yellow-500 ml-4">
                        Nota: Solo puede deshacer cambios que aún no se han actualizado.
                    </p>
                </div>
            </form>
        </div>
    </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { ref, computed, watch } from 'vue';
import { usuarios, roles, rolesMenu, menus, getUsuarioData, saveUsuarioData } from '@/modules/administrador/dto/myData'; // Ajustar la ruta

const usuarioData = ref(getUsuarioData());
const selectedUsuario = ref<string | null>(null);
const selectedRoles = ref<string[]>([]);
const selectedRolMenu = ref<string | null>(null);
const selectedMenus = ref<string[]>([]);
const searchQuery = ref<string>('');
const changesMade = ref(false);
const updated = ref(false);

// Store the initial state of the form
const initialState = ref({
    usuario: selectedUsuario.value,
    roles: [...selectedRoles.value],
    rolMenu: selectedRolMenu.value,
    menus: [...selectedMenus.value],
});

// Computed property to filter usuarios based on search query
const filteredUsuarios = computed(() => {
    if (!searchQuery.value) {
        return usuarios;
    }
    return usuarios.filter(usuario => 
        usuario.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Watcher to automatically select user if only one match is found
watch(filteredUsuarios, (newVal) => {
    if (newVal.length === 1) {
        selectedUsuario.value = newVal[0];
        handleUsuarioChange();
    } else {
        selectedUsuario.value = null;
    }
});

// Watcher to clear selected RolMenu if no roles are selected
watch(selectedRoles, (newRoles) => {
    if (newRoles.length === 0) {
        selectedRolMenu.value = null;
    }
});

// Selected user data to display the current settings
const selectedUsuarioData = computed(() => {
    if (selectedUsuario.value) {
        return usuarioData.value[selectedUsuario.value] || { roles: [], rolMenus: {} };
    }
    return null;
});

const handleUsuarioChange = () => {
    if (selectedUsuario.value) {
        const userData = usuarioData.value[selectedUsuario.value];
        selectedRoles.value = [...userData.roles];
        selectedRolMenu.value = null;
        selectedMenus.value = [];
        changesMade.value = false;
        updated.value = false;
    }
};

const handleRolMenuChange = () => {
    if (selectedRolMenu.value && selectedUsuario.value) {
        const userData = usuarioData.value[selectedUsuario.value];
        const rolMenuData = userData.rolMenus[selectedRolMenu.value] || { menus: [] };
        selectedMenus.value = rolMenuData.menus;
        changesMade.value = false;
        updated.value = false;
    }
};

const toggleRolesSelection = () => {
    if (allRolesSelected.value) {
        selectedRoles.value = [];
    } else {
        selectedRoles.value = [...roles];
    }
    changesMade.value = true;
};

const toggleMenusSelection = () => {
    if (allMenusSelected.value) {
        selectedMenus.value = [];
    } else {
        selectedMenus.value = [...menus];
    }
    changesMade.value = true;
};

const submitForm = () => {
    if (selectedUsuario.value) {
        const updatedData = {
            ...usuarioData.value,
            [selectedUsuario.value]: {
                roles: selectedRoles.value,
                rolMenus: {
                    ...usuarioData.value[selectedUsuario.value]?.rolMenus,
                    [selectedRolMenu.value || '']: {
                        menus: selectedMenus.value
                    }
                }
            }
        };
        saveUsuarioData(updatedData);
        changesMade.value = false;
        updated.value = true;
    }
};

const resetForm = () => {
    if (selectedUsuario.value) {
        const originalData = usuarioData.value[selectedUsuario.value] || { roles: [], rolMenus: {} };
        selectedRoles.value = [...originalData.roles];
        selectedRolMenu.value = null;
        selectedMenus.value = [];
        changesMade.value = false;
    }
};

const allRolesSelected = computed(() => {
    return roles.length > 0 && selectedRoles.value.length === roles.length;
});

const allMenusSelected = computed(() => {
    return menus.length > 0 && selectedMenus.value.length === menus.length;
});
</script>

<style scoped>
/* Estilos adicionales aquí */
</style>
