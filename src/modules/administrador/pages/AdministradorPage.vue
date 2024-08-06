<template>
    <DashboardLayout>
        <div class="flex justify-between mb-4">
            <div>
                <h2 class="text-2xl font-bold">ADMINISTRACIÓN</h2>
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
                    <!-- Roles -->
                    <div class="flex flex-col gap-4 col-span-4">
                        <label class="block text-gray-700 font-bold mb-2">Roles</label>
                        <button type="button" @click="toggleRolesSelection" class="px-3 py-1 bg-blue-500 text-white rounded text-sm mb-2 w-32">
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
                    <div class="flex flex-col gap-4 col-span-4" v-if="selectedRoles.length > 0">
                        <label class="block text-gray-700 font-bold mb-2">Rol Menú</label>
                        <div class="flex flex-col gap-2">
                            <div v-for="rolMenu in rolesMenu" :key="rolMenu.rol" class="flex items-center">
                                <input type="radio" :id="rolMenu.rol" :value="rolMenu.rol" v-model="selectedRolMenu" @change="handleRolMenuChange" class="mr-2">
                                <label :for="rolMenu.rol">{{ rolMenu.rol }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Menú -->
                    <div class="flex flex-col gap-4 col-span-4" v-if="selectedRolMenu">
                        <label class="block text-gray-700 font-bold mb-2">Menú</label>
                        <button type="button" @click="toggleMenusSelection" class="px-3 py-1 bg-blue-500 text-white rounded text-sm mb-2 w-32">
                            {{ allMenusSelected ? 'Desmarcar Todos' : 'Marcar Todos' }}
                        </button>
                        <div class="flex flex-col gap-2">
                            <div v-for="menu in menus" :key="menu" class="flex items-center">
                                <input type="checkbox" :id="menu" :value="menu" v-model="selectedMenus" class="mr-2">
                                <label :for="menu">{{ menu }}</label>
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
                    <p v-if="changesMade && !updated" class="text-yellow-500 ml-4">
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

const handleUsuarioChange = () => {
    if (selectedUsuario.value) {
        const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolMenus: {} };
        selectedRoles.value = userData.roles;
        selectedRolMenu.value = null;
        selectedMenus.value = [];
        // Mark changes as made
        changesMade.value = true;
        updated.value = false;
        // Store the current state for resetting later
        initialState.value = {
            usuario: selectedUsuario.value,
            roles: [...selectedRoles.value],
            rolMenu: selectedRolMenu.value,
            menus: [...selectedMenus.value],
        };
    } else {
        selectedRoles.value = [];
        selectedRolMenu.value = null;
        selectedMenus.value = [];
        changesMade.value = false;
        initialState.value = {
            usuario: null,
            roles: [],
            rolMenu: null,
            menus: [],
        };
    }
};

const handleRolMenuChange = () => {
    if (selectedUsuario.value && selectedRolMenu.value) {
        const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolMenus: {} };
        const rolMenuData = userData.rolMenus[selectedRolMenu.value] || { menus: [] };
        selectedMenus.value = rolMenuData.menus;
    } else {
        selectedMenus.value = [];
    }
};

const submitForm = () => {
    if (selectedUsuario.value) {
        usuarioData.value[selectedUsuario.value] = {
            roles: selectedRoles.value,
            rolMenus: usuarioData.value[selectedUsuario.value]?.rolMenus || {}
        };

        if (selectedRolMenu.value) {
            usuarioData.value[selectedUsuario.value].rolMenus[selectedRolMenu.value] = {
                menus: selectedMenus.value
            };
        }

        saveUsuarioData(usuarioData.value);

        // Alerta al usuario
        alert(`Datos de ${selectedUsuario.value} actualizados exitosamente.`);

        // Mark form as updated
        updated.value = true;
        changesMade.value = false;

        // Limpiar los campos después de actualizar
        handleUsuarioChange();
    }
};

// Reset form to the initial state
const resetForm = () => {
    selectedUsuario.value = initialState.value.usuario;
    selectedRoles.value = [...initialState.value.roles];
    selectedRolMenu.value = initialState.value.rolMenu;
    selectedMenus.value = [...initialState.value.menus];
    changesMade.value = false;
};

const allRolesSelected = computed(() => roles.length > 0 && selectedRoles.value.length === roles.length);
const allMenusSelected = computed(() => menus.length > 0 && selectedMenus.value.length === menus.length);

const toggleRolesSelection = () => {
    if (allRolesSelected.value) {
        selectedRoles.value = [];
    } else {
        selectedRoles.value = [...roles];
    }
};

const toggleMenusSelection = () => {
    if (allMenusSelected.value) {
        selectedMenus.value = [];
    } else {
        selectedMenus.value = [...menus];
    }
};
</script>

<style scoped></style>
