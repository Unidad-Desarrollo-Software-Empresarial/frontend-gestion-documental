// myData.ts

export const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4'];

export const roles = ['Administrador', 'Editor', 'Usuario', 'Invitado'];

export const rolesRuta = [
    { rol: 'Ruta 1' },
    { rol: 'Ruta 2' },
    { rol: 'Ruta 3' },
    { rol: 'Ruta 4' }
];

// Definimos rutas con valor asociado
export const rutas = [
    { name: 'Dashboard', value: 0 },
    { name: 'Settings', value: 0 },
    { name: 'Profile', value: 0 },
    { name: 'Help', value: 0 },
    { name: 'User Management', value: 1 },  // Hija de Dashboard
    { name: 'System Settings', value: 2 },  // Hija de Settings
    { name: 'User Profile', value: 3 },     // Hija de Profile
    { name: 'Help Center', value: 4 }       // Hija de Help
];

export const getUsuarioData = () => {
    const data = localStorage.getItem('usuarioData');
    return data ? JSON.parse(data) : {};
};

export const saveUsuarioData = (data: Record<string, any>) => {
    localStorage.setItem('usuarioData', JSON.stringify(data));
};
