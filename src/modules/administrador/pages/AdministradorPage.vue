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
                  <div v-for="ruta in rutas.filter((r) => r.value !== 0)" :key="ruta.name" class="flex items-center">
                    <input type="checkbox" :id="ruta.name" :value="ruta.name" v-model="selectedRutas" class="mr-2" />
                    <label :for="ruta.name">{{ ruta.name }}</label>
                  </div>
                </div>

                <div class="flex gap-4 mt-4">
                  <button type="button" @click="openCreateRouteModal" class="px-2 py-1 bg-green-500 text-white rounded text-xs w-full">
                    Crear Ruta
                  </button>
                  <button
                    type="button"
                    @click="openEditRouteModal"
                    class="px-2 py-1 bg-yellow-500 text-white rounded text-xs w-full"
                    :disabled="selectedRutas.length !== 1"
                  >
                    Editar Ruta
                  </button>
                </div>
                <p v-if="selectedRutas.length > 1" class="text-red-500 mt-2">Solo se puede editar una ruta a la vez.</p>
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

    <CreateRouteModal :isOpen="isCreateRouteModalOpen" @close="closeCreateRouteModal" @create="handleCreateRoute" />
    <EditRouteModal :isOpen="isEditRouteModalOpen" :route="selectedRutas[0]" @close="closeEditRouteModal" @edit="handleEditRoute" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import CreateRouteModal from '../components/CreateRouteModal.vue'
import EditRouteModal from '../components/EditRouteModal.vue'
import { usuarios, roles, rolesRuta, rutas, getUsuarioData, saveUsuarioData } from '@/modules/administrador/dto/myData'

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
const initialState = ref<any>({})  // To store initial state

const isModalOpen = ref(false)

const editSelectedRoute = () => {
  if (selectedRutas.value.length === 1) {
    const routeToEdit = selectedRutas.value[0]
    console.log('Editando ruta:', routeToEdit)
  } else if (selectedRutas.value.length > 1) {
    alert('Solo puede editar una ruta a la vez.')
  } else {
    alert('Seleccione una ruta para editar.')
  }
}

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
  console.log('Nueva ruta creada:', route)
}

// Store the initial state of the form
const storeInitialState = () => {
  if (selectedUsuario.value) {
    const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolRutas: {} }
    initialState.value = {
      roles: [...userData.roles],
      rolRuta: selectedRolRuta.value,
      rutas: [...selectedRutas.value]
    }
  }
}

storeInitialState()

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
    selectedRutas.value = [] // Clear rutas if no roles are selected
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
    const userData = usuarioData.value[selectedUsuario.value] || { roles: [], rolRutas: {} }
    selectedRoles.value = [...userData.roles]
    selectedRolRuta.value = null
    selectedRutas.value = []
    changesMade.value = false
    updated.value = false
    storeInitialState()
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
    selectedRutas.value = rutas.filter((r) => r.value !== 0).map((r) => r.name)
  }
  changesMade.value = true
}

const submitForm = () => {
  if (selectedRoles.value.length === 0) {
    alert('Debe seleccionar al menos un rol antes de actualizar.')
    return
  }

  if (selectedRolRuta.value) {
    if (selectedRutas.value.length === 0) {
      alert('Debe seleccionar al menos una ruta después de seleccionar una Rol-Ruta.')
      return
    }
  }

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

    saveUsuarioData(updatedData)
    usuarioData.value = getUsuarioData()
    changesMade.value = false
    updated.value = true

    alert(`Datos de ${selectedUsuario.value} actualizados exitosamente.`)
  }
}

const resetForm = () => {
  if (selectedUsuario.value) {
    if (confirm('¿Estás seguro de que deseas deshacer los cambios?')) {
      const userInitialData = initialState.value
      selectedRoles.value = [...userInitialData.roles]
      selectedRolRuta.value = userInitialData.rolRuta
      selectedRutas.value = [...userInitialData.rutas]
      changesMade.value = false
    }
  }
}

// Computed properties
const allRolesSelected = computed(() => {
  return roles.length > 0 && selectedRoles.value.length === roles.length
})

const allRutasSelected = computed(() => {
  return rutas.length > 0 && selectedRutas.value.length === rutas.length
})
</script>

