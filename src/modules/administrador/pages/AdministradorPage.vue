<template>
  <DashboardLayout>
    <div class="flex flex-col md:flex-row justify-between mb-4">
      <div>
        <h2 class="text-2xl font-bold">ADMINISTRACION</h2>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-bold mb-4">Asignar ROL-PRIVILEGIO</h3>
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Selección de usuarios y campo de búsqueda en fila -->
        <div class="flex flex-col md:flex-row gap-8 col-span-1 md:col-span-4">
          <!-- Usuarios -->
          <div class="flex flex-col flex-1 md:w-1/2">
            <label class="block text-gray-700 font-bold mb-2">Usuarios</label>
            <select v-model="selectedUsuario" @change="handleUsuarioChange" class="p-2 border border-gray-300 rounded w-full">
              <option value="" disabled>Seleccione un usuario</option>
              <option v-for="usuario in filteredUsuarios" :key="usuario" :value="usuario">
                {{ usuario }}
              </option>
            </select>
          </div>

          <!-- Campo de búsqueda de usuarios -->
          <div class="flex flex-col flex-1 md:w-1/2">
            <label class="block text-gray-700 font-bold mb-2">Buscar Usuarios</label>
            <input type="text" v-model="searchQuery" placeholder="Buscar usuario..." class="p-2 border border-gray-300 rounded w-full" />
            <p v-if="searchQuery && filteredUsuarios.length === 0" class="text-red-500 mt-2">No hay coincidencias</p>
            <p v-if="searchQuery && filteredUsuarios.length > 1" class="text-green-500 mt-2">
              Cantidad de coincidencias: {{ filteredUsuarios.length }}
            </p>
          </div>
        </div>

        <!-- Mostrar roles solo si se selecciona un usuario -->
        <template v-if="selectedUsuario">
          <div class="col-span-1 md:col-span-4 flex flex-col md:flex-row gap-8">
            <!-- Recuadro con información de roles habilitados -->
            <div class="order-1 md:order-2 w-full md:w-64 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-60 overflow-auto text-sm">
              <h4 class="font-bold mb-2">Roles Asignados Al Usuario</h4>
              <div v-if="selectedUsuarioData">
                <ul class="list-disc pl-5">
                  <li v-for="role in selectedUsuarioData.roles" :key="role">{{ role }}</li>
                </ul>
              </div>
            </div>

            <!-- Recuadro con Rol-Ruta y Rutas Habilitadas -->
            <div class="order-2 md:order-3 w-full md:w-64 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-60 overflow-auto text-sm">
              <h4 class="font-bold mb-2">Rol-Ruta y Rutas Habilitadas Al Usuario</h4>
              <div v-if="selectedUsuarioData">
                <div v-for="(rutas, rolRuta) in selectedUsuarioData.rolRutas" :key="rolRuta">
                  <h5 class="font-bold mt-2">{{ rolRuta }}, Rutas:</h5>
                  <ul class="list-disc pl-5">
                    <li v-for="ruta in rutas.rutas" :key="ruta">{{ ruta }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Cuadro con roles, rol-ruta y rutas habilitadas -->
            <div class="order-3 md:order-1 flex-1 flex flex-col gap-6">
              <!-- Contenedor de Roles -->
              <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg max-h-80 overflow-auto">
                <h4 class="text-sm font-bold mb-2">Roles</h4>
                <button type="button" @click="toggleRolesSelection" class="px-2 py-1 bg-blue-500 text-white rounded text-xs mb-2 w-full">
                  {{ allRolesSelected ? 'Desmarcar Todos' : 'Marcar Todos' }}
                </button>
                <div class="flex flex-col gap-2">
                  <div v-for="role in roles" :key="role" class="flex items-center">
                    <input type="checkbox" :id="role" :value="role" v-model="selectedRoles" class="mr-2" />
                    <label :for="role">{{ role }}</label>
                  </div>
                </div>
              </div>

              <!-- Contenedor de Rol-Ruta -->
              <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg">
                <h4 class="text-sm font-bold mb-2">Rol-Ruta</h4>
                <select v-model="selectedRolRuta" @change="handleRolRutaChange" class="p-2 border border-gray-300 rounded w-full">
                  <option value="" disabled>Seleccione un Rol-Ruta</option>
                  <option v-for="rolRuta in rolesRuta" :key="rolRuta.rol" :value="rolRuta.rol">
                    {{ rolRuta.rol }}
                  </option>
                </select>
              </div>

              <!-- Contenedor de Rutas -->
              <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg max-h-80 overflow-auto">
                <h4 class="text-sm font-bold mb-2">Rutas</h4>
                <button type="button" @click="toggleRutasSelection" class="px-2 py-1 bg-blue-500 text-white rounded text-xs mb-2 w-full">
                  {{ allRutasSelected ? 'Desmarcar Todas' : 'Marcar Todas' }}
                </button>
                <div class="flex flex-col gap-2">
                  <div v-for="ruta in rutas" :key="ruta" class="flex items-center">
                    <input type="checkbox" :id="ruta" :value="ruta" v-model="selectedRutas" class="mr-2" />
                    <label :for="ruta">{{ ruta }}</label>
                  </div>
                </div>
                <div class="flex gap-4 mt-4">
                  <button type="button" @click="openCreateRouteModal" class="px-2 py-1 bg-green-500 text-white rounded text-xs w-full">
                    Crear Ruta
                  </button>
                  <button type="button" @click="openEditRouteModal" class="px-2 py-1 bg-yellow-500 text-white rounded text-xs w-full" :disabled="selectedRutas.length !== 1">
                    Editar Ruta
                  </button>
                </div>
                <p v-if="selectedRutas.length > 1" class="text-red-500 mt-2">
                  Solo se puede editar una ruta a la vez.
                </p>
              </div>
            </div>
          </div>
        </template>
      </form>
    </div>

    <CreateRouteModal :isOpen="isCreateRouteModalOpen" @close="closeCreateRouteModal" @create="handleCreateRoute" />
    <EditRouteModal :isOpen="isEditRouteModalOpen" :route="selectedRutas[0]" @close="closeEditRouteModal" @edit="handleEditRoute" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import CreateRouteModal from '../components/CreateRouteModal.vue' // Ajusta la ruta según corresponda
import EditRouteModal from '../components/EditRouteModal.vue'

import { ref, computed, watch } from 'vue'
import { usuarios, roles, rolesRuta, rutas, getUsuarioData, saveUsuarioData } from '@/modules/administrador/dto/myData' // Ajustar la ruta

const isCreateRouteModalOpen = ref(false)
const usuarioData = ref(getUsuarioData())
const selectedUsuario = ref<string | null>(null)
const selectedRoles = ref<string[]>([])
const selectedRolRuta = ref<string | null>(null)
const selectedRutas = ref<string[]>([])
const searchQuery = ref<string>('')
const changesMade = ref(false)
const updated = ref(false)
const selectedRouteToEdit = ref(null)
const isEditRouteModalOpen = ref(false)

const isModalOpen = ref(false)

const openEditRouteModal = () => {
  if (selectedRutas.value.length === 1) {
    isEditRouteModalOpen.value = true
  }
}
const closeEditRouteModal = () => {
  isEditRouteModalOpen.value = false
}
const handleEditRoute = (updatedRoute: string) => {
  // Lógica para manejar la edición de rutas
}
const openCreateRouteModal = () => {
  isCreateRouteModalOpen.value = true
}

const closeCreateRouteModal = () => {
  isCreateRouteModalOpen.value = false
}

const handleCreateRoute = (route: any) => {
  // Aquí puedes manejar la lógica para agregar la nueva ruta
  console.log('Nueva ruta creada:', route)
}

// Store the initial state of the form
const initialState = ref({
  usuario: selectedUsuario.value,
  roles: [...selectedRoles.value],
  rolRuta: selectedRolRuta.value,
  rutas: [...selectedRutas.value]
})

// Computed property to filter usuarios based on search query
const filteredUsuarios = computed(() => {
  if (!searchQuery.value) {
    return usuarios
  }
  return usuarios.filter((usuario) => usuario.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

// Watcher to automatically select user if only one match is found
watch(filteredUsuarios, (newVal) => {
  if (newVal.length === 1) {
    selectedUsuario.value = newVal[0]
    handleUsuarioChange()
  } else {
    selectedUsuario.value = null
  }
})

// Watcher to clear selected RolRuta if no roles are selected
watch(selectedRoles, (newRoles) => {
  if (newRoles.length === 0) {
    selectedRolRuta.value = null
  }
})

// Selected user data to display the current settings
const selectedUsuarioData = computed(() => {
  if (selectedUsuario.value) {
    return usuarioData.value[selectedUsuario.value] || { roles: [], rolRutas: {} }
  }
  return null
})

const handleUsuarioChange = () => {
  if (selectedUsuario.value) {
    // Verifica que `selectedUsuario.value` exista en `usuarioData.value`
    const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolRutas: {} }
    selectedRoles.value = [...userData.roles]
    selectedRolRuta.value = null
    selectedRutas.value = []
    changesMade.value = false
    updated.value = false
  }
}

const handleRolRutaChange = () => {
  if (selectedRolRuta.value && selectedUsuario.value) {
    const userData = usuarioData.value[selectedUsuario.value]
    const rolRutaData = userData.rolRutas[selectedRolRuta.value] || { rutas: [] }
    selectedRutas.value = rolRutaData.rutas
    changesMade.value = false
    updated.value = false
  }
}

const toggleRolesSelection = () => {
  if (allRolesSelected.value) {
    selectedRoles.value = []
  } else {
    selectedRoles.value = [...roles]
  }
  changesMade.value = true
}

const toggleRutasSelection = () => {
  if (allRutasSelected.value) {
    selectedRutas.value = []
  } else {
    selectedRutas.value = [...rutas]
  }
  changesMade.value = true
}

const submitForm = () => {
  if (selectedUsuario.value) {
    const updatedData = {
      ...usuarioData.value,
      [selectedUsuario.value]: {
        roles: selectedRoles.value,
        rolRutas: {
          ...usuarioData.value[selectedUsuario.value]?.rolRutas,
          [selectedRolRuta.value || '']: {
            rutas: selectedRutas.value
          }
        }
      }
    }

    // Guarda los datos en localStorage
    saveUsuarioData(updatedData)

    // Actualiza el estado del componente
    usuarioData.value = getUsuarioData() // Vuelve a cargar los datos desde localStorage

    changesMade.value = false
    updated.value = true

    // Alerta al usuario
    alert(`Datos de ${selectedUsuario.value} actualizados exitosamente.`)
  }
}

const resetForm = () => {
  if (selectedUsuario.value) {
    const originalData = usuarioData.value[selectedUsuario.value] || { roles: [], rolRutas: {} }
    selectedRoles.value = [...originalData.roles]
    selectedRolRuta.value = null
    selectedRutas.value = []
    changesMade.value = false
  }
}

// Computed properties
const allRolesSelected = computed(() => {
  return roles.length > 0 && selectedRoles.value.length === roles.length
})

// Computed properties
const allRutasSelected = computed(() => {
  return rutas.length > 0 && selectedRutas.value.length === rutas.length
})
</script>
